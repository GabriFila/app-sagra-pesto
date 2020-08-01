import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../../fbConfig';
import getServicesRef from '../../helpers/getServicesRef';
import { StorageContext } from '../../context/StorageContext';
import { makeStyles } from '@material-ui/core/styles';

interface IServiceStarterProps {
  isServiceActive: boolean;
  serviceRef: any;
}

const useStyles = makeStyles(theme => ({
  serviceOn: {
    backgroundColor: theme.palette.error.main,
    marginBottom: 20
  },
  serviceOff: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: 20
  }
}));

const ServiceStarter: React.FunctionComponent<IServiceStarterProps> = ({
  isServiceActive,
  serviceRef
}) => {
  const classes = useStyles();
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
          startingCourses: storageCourses.map(course => ({
            ...course,
            dishes: course.dishes.map(dish => ({
              name: dish.name,
              qt: dish.qt
            }))
          }))
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <Button
      variant="contained"
      className={isServiceActive ? classes.serviceOn : classes.serviceOff}
      onClick={changeServiceState}
    >
      {isServiceActive ? 'Termina servizio' : 'Inizia servizio'}
    </Button>
  );
};

export default ServiceStarter;
