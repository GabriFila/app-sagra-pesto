import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
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
  const { storageCourses } = useContext(StorageContext);

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
      getServicesRef().add({
        start: firebase.firestore.FieldValue.serverTimestamp(),
        end: null,
        totalRevenue: 0,
        totalInstantRevenue: 0,
        totalPeople: 0,
        lastOrderNum: 0,
        totalInstantOrders: 0,
        totalOrders: 0,
        // TODO add storage, get it from props
        startingCourses: storageCourses.map(course => {
          return {
            name: course.name,
            dishes: course.dishes.map(dish => {
              return { name: dish.name, qt: dish.storageQt };
            })
          };
        })
        // get set current storage
      });
    }
  };

  return (
    <Paper
      elevation={6}
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 70,
        marginBottom: 20
      }}
    >
      <Button
        variant="contained"
        style={{
          backgroundColor: isServiceActive ? 'red' : 'green',
          margin: 'auto'
        }}
        onClick={changeServiceState}
      >
        {isServiceActive ? 'Termina servizio' : 'Inizia servizio'}
      </Button>
    </Paper>
  );
};

export default ServiceStarter;
