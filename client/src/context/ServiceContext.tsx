import React, { useEffect, useState, createContext, useContext } from 'react';
import getServiceRef from '../helpers/getServiceRef';
import { IService } from '../../../types';
import { AuthContext } from './AuthContext';

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
  const { authPhase } = useContext(AuthContext);

  useEffect(() => {
    let unsubscribeService = () => {};
    if (authPhase === 'in') {
      unsubscribeService = getServiceRef().onSnapshot(
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
    } else {
      setCurrentService(undefined);
      setIsServiceActive(undefined);
      setCurrentServiceId('');
    }
    return () => {
      unsubscribeService();
    };
  }, [authPhase]);

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
