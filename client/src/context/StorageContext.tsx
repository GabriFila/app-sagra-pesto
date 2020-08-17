import React, { useEffect, useState, createContext } from 'react';
import getStorageRef from '../helpers/getStorageRef';
import { IStorage, IStorageCourse } from '../../../types';

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

  useEffect(() => {
    const unsubscribe = getStorageRef().onSnapshot(
      snap => {
        setStroageRef(snap.ref);
        setStorageCourses((snap.data() as IStorage)?.storageCourses);
      },
      err =>
        console.error('ERROR IN GETTINFG STORAGE INFO', err.message, err.stack)
    );
    return () => unsubscribe();
  }, []);

  return (
    <StorageContext.Provider
      value={{ storageCourses: storageCourses, storageRef }}
    >
      {children}
    </StorageContext.Provider>
  );
};

const withStorageContext = (BaseComponent: React.FunctionComponent) => (
  props: any
) => (
  <StorageContextProvider>
    <BaseComponent {...props} />
  </StorageContextProvider>
);

export default withStorageContext;
