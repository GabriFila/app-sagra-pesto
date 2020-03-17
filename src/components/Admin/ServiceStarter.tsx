import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../../fbConfig';
import getServicesRef from '../../helpers/getServicesRef';
import { StorageContext } from '../../context/StorageContext';

interface IServiceStarterProps {
  isServiceActive: boolean;
  serviceRef: any;
}

const ServiceStarter: React.FunctionComponent<IServiceStarterProps> = ({
  isServiceActive,
  serviceRef
}) => {
  const { storageDishes } = useContext(StorageContext);

  const changeServiceState = () => {
    if (isServiceActive)
      // end service
      serviceRef
        .set(
          { end: firebase.firestore.FieldValue.serverTimestamp() },
          { merge: true }
        )
        .catch((err: Error) => console.error(err));
    else {
      getServicesRef()
        .add({
          start: firebase.firestore.FieldValue.serverTimestamp(),
          end: null,
          totalRevenue: 0,
          totalInstantRevenue: 0,
          totalPeople: 0,
          lastOrderNum: 0,
          totalInstantOrders: 0,
          totalOrders: 0,
          // TODO add storage, get it from props
          startingCourses: storageDishes.map(dish => {
            return {
              name: dish.name,
              qt: dish.storageQt
            };
          })
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: isServiceActive ? 'red' : 'green',
        marginBottom: 20
      }}
      onClick={changeServiceState}
    >
      {isServiceActive ? 'Termina servizio' : 'Inizia servizio'}
    </Button>
  );
};

export default ServiceStarter;
