import React, { useEffect, useState, createContext } from 'react';
import getServiceRef from '../helpers/getServiceRef';
import { IService } from '../../../types';

interface IServiceContext {
  service: IService | undefined;
  serviceRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  serviceId: string;
  isServiceActive: boolean;
}
export const ServiceContext = createContext<IServiceContext>({
  service: undefined,
  serviceRef: null,
  serviceId: undefined,
  isServiceActive: undefined
});

const ServiceContextProvider: React.FunctionComponent = ({ children }) => {
  const [service, setCurrentService] = useState<IService | undefined>(
    undefined
  );
  const [serviceRef, setCurrentServiceRef] = useState<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  >();
  const [serviceId, setCurrentServiceId] = useState('');
  const [isServiceActive, setIsServiceActive] = useState<boolean>(undefined);

  useEffect(() => {
    const unsubscribeService = getServiceRef().onSnapshot(
      snaps => {
        if (snaps.size === 0 || snaps.size > 1) {
          // TODO add error to tell user
          setCurrentService(undefined);
          setIsServiceActive(false);
        } else
          snaps.forEach(snap => {
            setCurrentService(snap.data() as IService);
            setCurrentServiceRef(snap.ref);
            setCurrentServiceId(snap.id);
            setIsServiceActive(true);
          });
      },
      err => console.error('ERROR IN RETRIEVING SERVICE: ', err)
    );
    return () => unsubscribeService();
  }, []);

  return (
    <ServiceContext.Provider
      value={{ service, serviceRef, serviceId, isServiceActive }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

// const withServiceContext = (BaseComponent: React.FunctionComponent) => (
//   props: any
// ) => (
//   <ServiceContextProvider>
//     <BaseComponent {...props} />
//   </ServiceContextProvider>
// );

export default ServiceContextProvider;
