import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  IOrderCourse,
  IStorage,
  IService,
  IDBCourse,
  IUserSagraRolesDoc,
  IInstantOrderCourse
} from '../../types';
import rolesToClaims from './helpers/rolesToClaims';
import { removeDishesFromStorage } from './helpers/storageHelpers';

admin.initializeApp();
const db = admin.firestore();

export const onUserCreate = functions
  .region('europe-west2')
  .auth.user()
  .onCreate(user => {
    const { uid, email } = user;
    return db
      .collection('userSagraRoles')
      .doc(`sr_${uid}`)
      .set({ roles: [], email })
      .then(() => console.info(`User roles of ${email}  created`))
      .then(() => db.collection('users').doc(uid).set({}))
      .catch((err: Error) => {
        console.error(
          'ERROR WHEN CREATING USER ROLES INFO AFTER USER CREATED',
          err.message,
          err.stack
        );
        return;
      });
  });

export const onUserDelete = functions
  .region('europe-west2')
  .auth.user()
  .onDelete(user => {
    const { uid, email } = user;
    return db
      .collection('userSagraRoles')
      .doc(`sr_${uid}`)
      .delete()
      .then(() => console.info(`User roles of ${email} deleted`))
      .then(() => db.collection('users').doc(uid).delete())
      .catch((err: Error) => {
        console.error(
          'ERROR WHEN DELETING USER ROLE INFO AFTER USER DELETION',
          err.message,
          err.stack
        );
        return;
      });
  });

export const onUserSagraRolesUpdate = functions
  .region('europe-west2')
  .firestore.document('userSagraRoles/{docId}')
  .onUpdate((change, ctx) => {
    const uid = (ctx.params.docId as string).substring(3);
    const { roles, name } = change.after.data() as IUserSagraRolesDoc;

    return admin
      .auth()
      .setCustomUserClaims(
        uid,
        // from [primi,bar] to {primi:true, bar:true}
        rolesToClaims(roles)
      )
      .then(() =>
        console.info(`Roles of ${name} updated to ${roles.toString()}`)
      )
      .catch((err: Error) => {
        console.error(err.message, err.stack);
        return;
      });
  });

export const createOrder = functions
  .region('europe-west2')
  .https.onCall((data, ctx) => {
    const courses = data.courses as IOrderCourse[];
    const people = data.people as number;
    const revenue = data.revenue as number;
    const orderNote = data.orderNote as string;
    const currentServiceId = data.serviceId;
    const year = new Date().getFullYear();

    const currentServiceRef = db
      .collection('sagre')
      .doc(String(year))
      .collection('services')
      .doc(currentServiceId);

    const currentStorageRef = db
      .collection('sagre')
      .doc(String(year))
      .collection('storage')
      .doc('storage');

    let newOrderNum: number,
      totalRevenue: number,
      totalOrders: number,
      totalPeople: number;
    return db
      .runTransaction(t => {
        return t
          .getAll(currentServiceRef, currentStorageRef)
          .then(([serviceSnap, storageSnap]) => {
            if ((serviceSnap as any).data().end !== null)
              throw new Error('No active service');
            const service = serviceSnap.data() as IService;

            newOrderNum = service.lastOrderNum + 1;
            totalRevenue = service.totalRevenue;
            totalOrders = service.totalOrders;
            totalPeople = service.totalPeople;
            const storage = storageSnap.data() as IStorage;
            const { storageCourses } = storage;

            courses.forEach(course => {
              course.dishes.forEach(dish => {
                storageCourses.map(storageCourse => {
                  if (storageCourse.courseName === course.courseName)
                    storageCourse.dishes.map(storageDish => {
                      if (dish.shortName === storageDish.shortName)
                        storageDish.qt -= dish.qt;
                      return dish;
                    });
                  return course;
                });
              });
            });

            t.set(
              currentServiceRef,
              {
                lastOrderNum: newOrderNum,
                totalRevenue: totalRevenue + revenue,
                totalOrders: totalOrders + 1,
                totalPeople: totalPeople + people
              },
              { merge: true }
            ).set(currentStorageRef, { storageCourses });
          });
      })
      .then(() => {
        const newCourses: IDBCourse[] = courses.map(
          ({ courseName, kitchen, dishes, note }) => ({
            orderNum: newOrderNum,
            courseName,
            kitchen,
            note,
            status: 'wait',
            dishes: dishes.map(({ qt, shortName }) => ({ qt, shortName }))
          })
        );
        const newOrder = {
          orderNum: newOrderNum,
          status: 'pending',
          revenue,
          people,
          tableNum: null,
          note: orderNote
        };
        const toFullfill = newCourses.map(newCourse =>
          currentServiceRef.collection('courses').add(newCourse)
        );
        toFullfill.push(currentServiceRef.collection('orders').add(newOrder));
        return Promise.all(toFullfill);
      })
      .then(() => {
        console.info('Order creation succeded, with order: ', newOrderNum);
        return { outcome: true, newOrderNum };
      })
      .catch((err: Error) => {
        console.error('ERROR IN CREATING ORDER', err.message, err.stack);
        return { outcome: 'false', err: err.message };
      });
  });

export const onInstantOrderCreate = functions
  .region('europe-west2')
  .firestore.document(
    'sagre/{sagraId}/services/{serviceId}/instantOrders/{instantOrderId}'
  )
  .onCreate((change, ctx) => {
    const courses = change.data()?.courses as IInstantOrderCourse[];
    const revenue = change.data()?.revenue as number;
    const sagraId = ctx.params.sagraId;
    const serviceId = ctx.params.serviceId;
    const instantOrderId = ctx.params.instantOrderId;

    const currentServiceRef = db
      .collection('sagre')
      .doc(sagraId)
      .collection('services')
      .doc(serviceId);

    const currentStroageRef = db
      .collection('sagre')
      .doc(sagraId)
      .collection('storage')
      .doc('storage');

    const toFullFill: Promise<any>[] = [];
    toFullFill.push(
      currentServiceRef.set(
        {
          totalInstantOrders: admin.firestore.FieldValue.increment(1),
          totalInstantRevenue: admin.firestore.FieldValue.increment(revenue)
        },
        { merge: true }
      )
    );

    toFullFill.push(
      db.runTransaction(t =>
        t.get(currentStroageRef).then(storageSnap => {
          const storage = storageSnap.data() as IStorage;

          const { storageCourses } = storage;

          removeDishesFromStorage(courses, storageCourses);

          t.set(currentStroageRef, { storageCourses });
        })
      )
    );
    return Promise.all(toFullFill)
      .then(() => {
        console.info(`Storage udpated after instant order ${instantOrderId}`);
        return;
      })
      .catch((err: Error) => {
        console.error(
          'ERROR IN UDPATING STORAGE AFTER INSTANT ORDER CREATED',
          err.message,
          err.stack
        );
        return;
      });
  });

// TODO create a function to prevent 2 contemporary services
