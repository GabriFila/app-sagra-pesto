import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import { IService, IOrder } from '../../types';

admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const onUserCreate = functions
  .region('europe-west2')
  .auth.user()
  .onCreate(user => {
    const { uid, displayName } = user;
    return db
      .collection('userSagraRoles')
      .doc(`sr_${uid}`)
      .set({ roles: [], name: displayName })
      .then(() => console.log(`User roles of ${displayName}  created`))
      .then(() =>
        db
          .collection('users')
          .doc(uid)
          .set({})
      )
      .catch(err => console.error(err));
  });

export const onUserDelete = functions
  .region('europe-west2')
  .auth.user()
  .onDelete(user => {
    const { uid, displayName } = user;
    return db
      .collection('userSagraRoles')
      .doc(`sr_${uid}`)
      .delete()
      .then(() => console.log(`User roles of ${displayName} deleted`))
      .then(() =>
        db
          .collection('users')
          .doc(uid)
          .delete()
      )
      .catch(err => console.error(err));
  });

export const onUserSagraRolesUpdate = functions
  .region('europe-west2')
  .firestore.document('userSagraRoles/{docId}')
  .onUpdate((change, ctx) => {
    interface IUserSagraRolesDoc {
      name: string;
      roles: string[];
    }

    const uid = (ctx.params.docId as string).substring(3);
    const { roles, name } = change.after.data() as IUserSagraRolesDoc;

    return admin
      .auth()
      .setCustomUserClaims(
        uid,
        // from [primi,bar] to {primi:true, bar:true}
        roles.reduce((acc, val) => {
          return { ...acc, [val.toString()]: true };
        }, {})
      )
      .then(() =>
        console.log(`Roles of ${name} updated to ${roles.toString()}`)
      )
      .catch(err => console.error(err));
  });

// export const createOrder = functions
//   .region('europe-west2')
//   .https.onCall((data, ctx) => {
//     const newOrder = data.newOrder as IOrder;
//     const year = new Date().getFullYear();

//     const currentServiceRef = db
//       .collection('sagre')
//       .doc(String(year))
//       .collection('services')
//       .where('EndDate', '==', null)
//       .limit(1);

//     return db.runTransaction(t => {
//       return t
//         .get(currentServiceRef)
//         .then(snap => {
//           snap.forEach(service => {
//             let { lastOrderNum } = service.data() as IService;
//             const orderCollectionRef = service.ref.collection('orders').doc();

//             t.create(orderCollectionRef, {
//               ...newOrder,
//               orderNum: lastOrderNum++
//             });

//             // need to update service data
//           });
//         })
//         .catch(err => console.error(err));
//     });
//   });