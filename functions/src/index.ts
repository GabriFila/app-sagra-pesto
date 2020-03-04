import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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
      .then(_ => console.log('User roles created'))
      .catch(err => console.error(err));
  });

export const onUserDelete = functions
  .region('europe-west2')
  .auth.user()
  .onDelete(user => {
    const { uid } = user;
    return db
      .collection('userSagraRoles')
      .doc(`sr_${uid}`)
      .delete()
      .then(_ => console.log('User roles deleted'))
      .catch(err => console.error(err));
  });

export const onUserSagraRolesUpdate = functions
  .region('europe-west2')
  .firestore.document('userSagraRoles/{docId}')
  .onUpdate((change, ctx) => {
    return db.collection('temp').add({ hello: 'world' });
  });
