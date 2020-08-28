import React, { useEffect, useState, createContext, useContext } from 'react';
import getStorageRef from '../helpers/getStorageRef';
import { IStorage, IStorageCourse } from '../../../types';
import { AuthContext } from './AuthContext';

interface IStorageContext {
  storageCourses: IStorageCourse[];
  storageRef: any;
}
export const StorageContext = createContext<IStorageContext>({
  storageCourses: [],
  storageRef: null
});

const StorageContextProvider: React.FunctionComponent = ({ children }) => {
  const [storageCourses, setStorageCourses] = useState<IStorageCourse[]>([]);
  const [storageRef, setStroageRef] = useState(getStorageRef);
  const { authPhase } = useContext(AuthContext);

  useEffect(() => {
    let unsubscribe = () => {};
    if (authPhase === 'in') {
      unsubscribe = getStorageRef().onSnapshot(
        snap => {
          setStroageRef(snap.ref);
          setStorageCourses([...(snap.data() as IStorage)?.storageCourses]);
        },
        err =>
          console.error(
            'ERROR IN GETTINFG STORAGE INFO',
            err.message,
            err.stack
          )
      );
    } else {
      setStorageCourses([]);
      setStroageRef(null);
    }
    return () => {
      unsubscribe();
    };
  }, [authPhase]);

  return (
    <StorageContext.Provider value={{ storageCourses, storageRef }}>
      {children}
    </StorageContext.Provider>
  );
};

// const withStorageContext = (BaseComponent: React.FunctionComponent) => (
//   props: any
// ) => (
//   <StorageContextProvider>
//     <BaseComponent {...props} />
//   </StorageContextProvider>
// );

export default StorageContextProvider;
