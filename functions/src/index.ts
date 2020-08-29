import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  IOrderCourse,
  IStorage,
  IService,
  IDBCourse,
  IUserSagraRolesDoc,
  IInstantOrderCourse,
  CourseStatus,
  IStorageCourse,
  IDBOrder
} from '../../types';
import {
  removeCoursesFromStorage,
  addDishesToStorage
} from './helpers/storageHelpers';
import { hasRoles } from './helpers/hasRoles';

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
      .then(() => console.info(`User roles document for ${email} created`))
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
        { roles }
      )
      .then(() =>
        console.info(`Roles of ${name} updated to ${roles.toString()}`)
      )
      .catch((err: Error) => {
        console.error(err.message, err.stack);
        return;
      });
  });

export const onUserSagraRolesDelete = functions
  .region('europe-west2')
  .firestore.document('userSagraRoles/{docId}')
  .onDelete((change, ctx) => {
    const uid = (ctx.params.docId as string).substring(3);

    return admin
      .auth()
      .setCustomUserClaims(uid, {})
      .then(() => console.info(`Roles of ${name} deleted `))
      .catch((err: Error) => {
        console.error(err.message, err.stack);
        return;
      });
  });

export const createOrder = functions
  .region('europe-west2')
  .https.onCall((data, ctx) => {
    const errorRes = { outcome: false };
    if (!hasRoles(ctx.auth?.token.roles, ['cassa'])) {
      console.error('ERROR IN CREATING ORDER, call by a non auithorized user');
      return errorRes;
    }

    const courses = data.courses as IOrderCourse[];
    const people = data.people as number;
    const revenue = data.revenue as number;
    const orderNote = data.orderNote as string;
    const currentServiceId = data.serviceId;
    const year = new Date().getFullYear();

    if (
      [courses, people, revenue, orderNote, currentServiceId, year].some(
        elm => elm === undefined
      )
    ) {
      console.error(
        new Error('ERROR IN CREATING ORDER, some fields were undefined')
      );
    }

    if (courses.length === 0 || revenue <= 0) {
      console.error(
        new Error(
          'ERROR IN CREATING ORDER, incorreect value for some parameters'
        )
      );
    }

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

    let newOrderNum: number;

    return db
      .runTransaction(t => {
        return t
          .getAll(currentServiceRef, currentStorageRef)
          .then(([serviceSnap, storageSnap]) => {
            if ((serviceSnap as any).data().end !== null)
              throw new Error('No active service');
            const service = serviceSnap.data() as IService;

            newOrderNum = service.lastOrderNum + 1;
            const { totalRevenue, totalOrders, totalPeople } = service;

            const storage = storageSnap.data() as IStorage;
            const { storageCourses } = storage;
            removeCoursesFromStorage(courses, storageCourses);

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
            waiterId: null,
            dishes: dishes.map(({ qt, shortName }) => ({ qt, shortName }))
          })
        );
        const newOrder = {
          orderNum: newOrderNum,
          status: 'pending',
          revenue,
          people,
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
        throw new functions.https.HttpsError(
          'unknown',
          'ERROR IN UDPATING STORAGE AND SERVICE AFTER INSTANT ORDER CREATED'
        );
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

          removeCoursesFromStorage(courses, storageCourses);

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
          'ERROR IN UDPATING STORAGE AND SERVICE AFTER INSTANT ORDER CREATED',
          err.message,
          err.stack
        );
        throw new functions.https.HttpsError(
          'unknown',
          'ERROR IN UDPATING STORAGE AND SERVICE AFTER INSTANT ORDER CREATED'
        );
      });
  });

export const onCourseDelete = functions
  .region('europe-west2')
  .firestore.document('sagre/{sagraId}/services/{serviceId}/courses/{courseId}')
  .onUpdate((change, ctx) => {
    const deletedStatus: CourseStatus = 'deleted';
    if (change.after.data().status !== deletedStatus) return;
    else {
      const course = change.after.data() as IDBCourse;
      const sagraId = ctx.params.sagraId;
      const serviceId = ctx.params.serviceId;

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
      toFullFill.push();
      let storageCourses: IStorageCourse[];
      return db
        .runTransaction(t =>
          t.get(currentStroageRef).then(storageSnap => {
            const storage = storageSnap.data() as IStorage;

            storageCourses = storage.storageCourses;

            addDishesToStorage(
              course.dishes,
              storageCourses,
              course.courseName
            );
            t.set(currentStroageRef, { storageCourses });
          })
        )
        .then(() => {
          let courseRevenue = 0;
          const storageCourseDishes = storageCourses.find(
            storageCourse => storageCourse.courseName === course.courseName
          )?.dishes;
          course.dishes.forEach(dish => {
            const storageDishFound = storageCourseDishes?.find(
              storageDish => storageDish.shortName === dish.shortName
            );
            if (storageDishFound)
              courseRevenue += dish.qt * storageDishFound?.price;
          });
          return currentServiceRef.set(
            {
              totalRevenue: admin.firestore.FieldValue.increment(-courseRevenue)
            },
            { merge: true }
          );
        })
        .catch((err: Error) => {
          console.error(
            'ERROR IN UDPATING STORAGE AND SERVICE AFTER COURSE CREATED',
            err.message,
            err.stack
          );
          throw new functions.https.HttpsError('unknown', 'An error occured');
        });
    }
  });

// TODO compute revenue in function to keep safety
export const addCoursesToOrder = functions
  .region('europe-west2')
  .https.onCall((data, ctx) => {
    const errorRes = { outcome: false };
    if (!hasRoles(ctx.auth?.token.roles, ['sala', 'cassa', 'smazzo'])) {
      console.error(
        new Error(
          'ERROR IN ADDING COURSE TO ORDER, call by a non auithorized user'
        )
      );
    }

    const courses = data.courses as IOrderCourse[];
    const revenue = data.revenue as number;
    const orderId = data.orderId as string;
    const waiterId = ctx.auth?.uid;
    const currentServiceId = data.serviceId;
    const year = new Date().getFullYear();
    let orderNum: number = 0;

    if (
      [courses, revenue, waiterId, currentServiceId, year].some(
        elm => elm === undefined
      )
    ) {
      console.error('ERROR IN CREATING ORDER, some fields were undefined');
      return errorRes;
    }

    if (revenue <= 0) {
      console.error('ERROR IN CREATING ORDER, revenue is less than 0');
      return errorRes;
    }

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

    return currentServiceRef
      .collection('orders')
      .doc(orderId)
      .get()
      .then(orderSnap => {
        if (!orderSnap.exists) throw new Error('No order found');
        else {
          const orderWaiterId = (orderSnap.data() as IDBOrder).waiterId;
          orderNum = (orderSnap.data() as IDBOrder).orderNum;
          if (
            waiterId !== orderWaiterId &&
            !hasRoles(ctx.auth?.token.roles, ['cassa', 'smazzo'])
          )
            throw new Error('Different waiter IDs');
          else
            return db.runTransaction(t => {
              return t
                .getAll(currentServiceRef, currentStorageRef)
                .then(([serviceSnap, storageSnap]) => {
                  if ((serviceSnap.data() as IService).end !== null)
                    throw new Error('No active service');
                  const service = serviceSnap.data() as IService;

                  const { totalRevenue } = service;
                  const storage = storageSnap.data() as IStorage;
                  const { storageCourses } = storage;
                  removeCoursesFromStorage(courses, storageCourses);

                  t.set(
                    currentServiceRef,
                    {
                      totalRevenue: totalRevenue + revenue
                    },
                    { merge: true }
                  ).set(currentStorageRef, { storageCourses });
                });
            });
        }
      })
      .then(() => {
        const newCourses: IDBCourse[] = courses.map(
          ({ courseName, kitchen, dishes, note }) => ({
            orderNum,
            courseName,
            kitchen,
            note,
            status: 'wait',
            waiterId,
            dishes: dishes.map(({ qt, shortName }) => ({ qt, shortName }))
          })
        );
        return Promise.all(
          newCourses.map(newCourse =>
            currentServiceRef.collection('courses').add(newCourse)
          )
        );
      })
      .then(() => {
        console.info('Added courses to order: ', orderNum);
        return { outcome: true };
      })
      .catch((err: Error) => {
        console.error('ERROR IN CREATING ORDER', err.message, err.stack);
        throw new functions.https.HttpsError('unknown', 'An error occured');
      });
  });

// TODO create a function to prevent 2 contemporary services
