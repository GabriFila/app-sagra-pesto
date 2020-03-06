import React, { useEffect, useState, createContext } from 'react';
import getStorageRef from '../helpers/getStorageRef';
import { IStorage } from '../../types';

export const StorageContext = createContext<IStorage>({ storageCourses: [] });

const StorageContextProvider: React.FunctionComponent = ({ children }) => {
  const [storage, setStorage] = useState<IStorage>({ storageCourses: [] });

  useEffect(() => {
    const unsubscribe = getStorageRef().onSnapshot(
      snap => {
        console.log(snap.data());
        setStorage(snap.data() as IStorage);
      },
      err => console.error(err)
    );
    return () => unsubscribe();
  }, []);

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
};

export default StorageContextProvider;
