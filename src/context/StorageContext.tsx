import React, { useEffect, useState, createContext } from 'react';
import getStorageRef from '../helpers/getStorageRef';
import { IStorage, IStorageDish } from '../../types';

interface IStorageContext {
  storageDishes: IStorageDish[];
  courseNames: string[];
  storageRef: any;
}
export const StorageContext = createContext<IStorageContext>({
  storageDishes: [],
  courseNames: [],
  storageRef: null
});

const StorageContextProvider: React.FunctionComponent = ({ children }) => {
  const [storageDishes, setStorageDishes] = useState<IStorageDish[]>([]);
  const [storageRef, setStroageRef] = useState(getStorageRef);
  const [courseNames, setCourseNames] = useState([]);

  useEffect(() => {
    const unsubscribe = getStorageRef().onSnapshot(
      snap => {
        setStroageRef(snap.ref);
        setStorageDishes((snap.data() as IStorage).storageDishes);
        setCourseNames(
          (snap.data() as IStorage).storageDishes
            .map(dish => dish.courseName)
            .filter((x, i, a) => a.indexOf(x) === i)
        );
      },
      err => console.error('storage context', err)
    );
    return () => unsubscribe();
  }, []);

  return (
    <StorageContext.Provider
      value={{ storageDishes: storageDishes, storageRef, courseNames }}
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
