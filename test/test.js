const firebase = require('@firebase/testing');

const myWaiterId = 'myWaiterId';

const PROJECT_ID = 'its-cngei-genova';
const adminAuth = { uid: 'myId', email: 'test@test.com', roles: ['admin'] };
const waiterAuth = {
  uid: 'myWaiterId',
  email: 'test@test.com',
  roles: ['sala']
};

const firstKitchenAuth = {
  uid: 'firstCook',
  email: 'test@test.com',
  roles: ['cucina-primi']
};

const instantCashRegisterAuth = {
  uid: 'myId',
  email: 'test@test.com',
  roles: ['cassa-istantanea']
};

const mostAuth = {
  uid: 'myId',
  email: 'test@test.com',
  roles: [
    'admin',
    'cassa',
    'cassa-istantanea',
    'cucina-primi',
    'cucina-secondi',
    'cucina-bar',
    'cameriere'
  ]
};
const firestore = auth =>
  firebase.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore();

const admin = firebase
  .initializeAdminApp({
    projectId: PROJECT_ID
  })
  .firestore();

const sagraDoc = db => db.collection('sagre').doc('testSagra');
const storageDoc = sagraDoc =>
  sagraDoc.collection('storage').doc('testStorage');
const serviceDoc = sagraDoc =>
  sagraDoc.collection('services').doc('testService');
const orderDoc = serviceDoc => serviceDoc.collection('orders').doc('testOrder');
const courseDoc = serviceDoc =>
  serviceDoc.collection('courses').doc('testCourse');
const instantOrderDoc = serviceDoc =>
  serviceDoc.collection('instantOrders').doc('testInstantOrder');

before(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
  console.info('Firestore cleared');
});

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

after(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
  console.info('Firestore cleared');
});

describe('How a sagra doc should be secured', () => {
  it("Can't be read", async () => {
    const db = firestore(mostAuth);
    const testDoc = sagraDoc(db);
    await firebase.assertFails(testDoc.get());
  });

  it("Can't be written", async () => {
    const db = firestore(mostAuth);
    const testDoc = sagraDoc(db);
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });
});

describe('How a storage doc should be secured', () => {
  it("Can't be read by unauthenticated users", async () => {
    const db = firestore(null);
    const testDoc = storageDoc(sagraDoc(db));
    await firebase.assertFails(testDoc.get());
  });

  it("Can't be written by unauthenticated users", async () => {
    const db = firestore(null);
    const testDoc = storageDoc(sagraDoc(db));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it('Can be read by an admin', async () => {
    const db = firestore(adminAuth);
    const testDoc = storageDoc(sagraDoc(db));
    await firebase.assertSucceeds(testDoc.get());
  });

  it("Can't be created by unauthenticated users", async () => {
    const db = firestore();
    const testDoc = storageDoc(sagraDoc(db));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it('Can be updated by an admin', async () => {
    const db = firestore(adminAuth);
    await storageDoc(sagraDoc(admin)).set({ test: 'test' });
    const testDoc = storageDoc(sagraDoc(db));
    await firebase.assertSucceeds(testDoc.set({ storageCourses: [] }));
  });

  it("Can't be deleted by unauthenticated users", async () => {
    const db = firestore();
    const testDoc = storageDoc(sagraDoc(db));
    await firebase.assertFails(testDoc.delete());
  });
});

describe('How a service doc should be secured', () => {
  it("Can't be read by unauthenticated users", async () => {
    const db = firestore(null);
    const testDoc = serviceDoc(sagraDoc(db));
    await firebase.assertFails(testDoc.get());
  });

  it("Can't be written by unauthenticated users", async () => {
    const db = firestore(null);
    const testDoc = serviceDoc(sagraDoc(db));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it('Can be read by an admin', async () => {
    const db = firestore(adminAuth);
    const testDoc = serviceDoc(sagraDoc(db));
    await firebase.assertSucceeds(testDoc.get());
  });

  it("Can't be created by unauthenticated users", async () => {
    const db = firestore();
    const testDoc = serviceDoc(sagraDoc(db));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it('Can be created by admin', async () => {
    const db = firestore(adminAuth);
    const testDoc = serviceDoc(sagraDoc(db));
    await firebase.assertSucceeds(
      testDoc.set({
        end: null,
        lastOrderNum: 0,
        startingCourses: [],
        start: firebase.firestore.FieldValue.serverTimestamp(),
        totalInstantOrders: 0,
        totalInstantRevenue: 0,
        totalOrders: 0,
        totalPeople: 0,
        totalRevenue: 0
      })
    );
  });

  it('Can be updated by an admin', async () => {
    const db = firestore(adminAuth);
    await serviceDoc(sagraDoc(admin)).set({ end: 'before' });
    const testDoc = serviceDoc(sagraDoc(db));
    await firebase.assertSucceeds(
      testDoc.set({ end: 'after' }, { merge: true })
    );
  });

  it("Can't be deleted", async () => {
    const db = firestore(mostAuth);
    const testDoc = serviceDoc(sagraDoc(db));
    await firebase.assertFails(testDoc.delete());
  });
});

describe('How an order doc should be secured', () => {
  it("Can't be gotten", async () => {
    const db = firestore(mostAuth);
    const testDoc = orderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.get());
  });

  it("Can't be written by unauthenticated users", async () => {
    const db = firestore(null);
    const testDoc = orderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it("Can't be created", async () => {
    const db = firestore(mostAuth);
    const testDoc = orderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it('Can be updated by a waiter', async () => {
    const db = firestore(waiterAuth);
    await orderDoc(serviceDoc(sagraDoc(admin))).set({
      note: 'test',
      people: 'test',
      revenue: 'test',
      status: 'pending',
      orderNum: 'test'
    });
    const testDoc = orderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertSucceeds(
      testDoc.set(
        {
          tableNum: 'num',
          waiterId: 'id',
          waiterName: 'name',
          status: 'active'
        },
        { merge: true }
      )
    );
  });

  it("Can't be deleted", async () => {
    const db = firestore(mostAuth);
    const testDoc = orderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.delete());
  });
});

describe('How a course doc should be secured', () => {
  it("Can't be gotten", async () => {
    const db = firestore(mostAuth);
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.get());
  });

  it("Can't be written by unauthenticated users", async () => {
    const db = firestore(null);
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it("Can't be created", async () => {
    const db = firestore(mostAuth);
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it('Can be updated by a waiter when it has not yet been assigned to a waiter', async () => {
    const db = firestore(waiterAuth);
    await courseDoc(serviceDoc(sagraDoc(admin))).set({
      courseName: 'test',
      dishes: 'test',
      kitchen: 'test',
      note: 'test',
      orderNum: 'test',
      status: 'test',
      waiterId: null
    });
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertSucceeds(
      testDoc.set({ waiterId: 'myId' }, { merge: true })
    );
  });

  it('Can be updated by only its waiter when it is already linked to him', async () => {
    const db = firestore(waiterAuth);
    await courseDoc(serviceDoc(sagraDoc(admin))).set({
      courseName: 'test',
      dishes: 'test',
      kitchen: 'test',
      note: 'test',
      orderNum: 'test',
      status: 'test',
      waiterId: myWaiterId
    });
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertSucceeds(
      testDoc.set({ status: 'new' }, { merge: true })
    );
  });

  it('Can be updated by kitchen only when is in "prep" status and is the right kitchen', async () => {
    const db = firestore(firstKitchenAuth);
    await courseDoc(serviceDoc(sagraDoc(admin))).set({
      courseName: 'test',
      dishes: 'test',
      kitchen: 'Primi',
      note: 'test',
      orderNum: 'test',
      status: 'prep'
    });
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertSucceeds(
      testDoc.set({ status: 'ready' }, { merge: true })
    );
  });

  it('Can`t be updated by kitchen only when is in "prep" status but is the wrong kitchen', async () => {
    const db = firestore(firstKitchenAuth);
    await courseDoc(serviceDoc(sagraDoc(admin))).set({
      courseName: 'test',
      dishes: 'test',
      kitchen: 'Bar',
      note: 'test',
      orderNum: 'test',
      status: 'prep'
    });
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(
      testDoc.set({ status: 'ready' }, { merge: true })
    );
  });

  it('Can`t be updated by kitchen only when is in "wait" status', async () => {
    const db = firestore(firstKitchenAuth);
    await courseDoc(serviceDoc(sagraDoc(admin))).set({
      courseName: 'test',
      dishes: 'test',
      kitchen: 'Primi',
      note: 'test',
      orderNum: 'test',
      status: 'wait'
    });
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(
      testDoc.set({ status: 'ready' }, { merge: true })
    );
  });

  it("Can't be deleted", async () => {
    const db = firestore(mostAuth);
    const testDoc = courseDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.delete());
  });
});

describe('How an instant order doc should be secured', () => {
  it("Can't be gotten", async () => {
    const db = firestore(mostAuth);
    const testDoc = instantOrderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.get());
  });

  it("Can't be written by unauthenticated users", async () => {
    const db = firestore(null);
    const testDoc = instantOrderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  });

  it('Can be created by a instant cash register', async () => {
    const db = firestore(instantCashRegisterAuth);
    const testDoc = instantOrderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertSucceeds(testDoc.set({ courses: [], revenue: 2 }));
  });

  it('Canìt be updated', async () => {
    const db = firestore(mostAuth);
    await instantOrderDoc(serviceDoc(sagraDoc(admin))).set({
      test: 'test'
    });
    const testDoc = instantOrderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.set({ test: 'new' }));
  });

  it("Can't be deleted", async () => {
    const db = firestore(mostAuth);
    const testDoc = instantOrderDoc(serviceDoc(sagraDoc(db)));
    await firebase.assertFails(testDoc.delete());
  });
});
