import React, { useEffect, useState, createContext } from 'react';
import getServiceRef from '../helpers/getServiceRef';
import { IService } from '../../types';

interface IServiceContext {
  service: IService | undefined;
  serviceRef: any;
}
export const ServiceContext = createContext<IServiceContext>({
  service: undefined,
  serviceRef: null
});

const ServiceContextProvider: React.FunctionComponent = ({ children }) => {
  const [service, setCurrentService] = useState<IService | undefined>(
    undefined
  );
  const [serviceRef, setCurrentServiceRef] = useState();

  useEffect(() => {
    const unsubscribeService = getServiceRef().onSnapshot(
      snaps => {
        if (snaps.docs.length === 0) setCurrentService(undefined);
        else if (snaps.docs.length > 1) {
          // TODO add error to tell user
        } else
          snaps.forEach(snap => {
            setCurrentService(snap.data() as IService);
            setCurrentServiceRef(snap.ref);
            console.log(snap.ref);
          });
      },
      err => console.error(err)
    );
    return () => unsubscribeService();
  }, []);

  return (
    <ServiceContext.Provider value={{ service, serviceRef }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContextProvider;

// const initService: IService = {
//   start: null,
//   end: null,
//   totalRevenue: 0,
//   totalInstantRevenue: 0,
//   totalPeople: 0,
//   lastOrderNum: 0,
//   totalInstantOrders: 0,
//   totalOrders: 0,
//   // TODO add storage, get it from props
//   startingCourses: [] // get set current storage
// };
