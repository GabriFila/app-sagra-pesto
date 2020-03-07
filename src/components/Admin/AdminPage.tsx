import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import StorageTab from './StorageTab';
import ServiceTab from './ServiceTab';
import getCurrentServiceRef from '../../helpers/getCurrentServiceRef';
import { IService } from '../../../types';
import StorageContextProvider from '../../context/StorageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      height: 'calc(100% - 64px)',
      alignSelf: 'center',
      padding: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
        flexDirection: 'row'
      }
    }
  })
);

const AdminPage = () => {
  const classes = useStyles();

  const [currentServiceRef, setCurrentServiceRef] = useState();
  const [currentService, setCurrentService] = useState<IService | undefined>(
    undefined
  );

  useEffect(() => {
    const unsubscribeService = getCurrentServiceRef().onSnapshot(
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
    <StorageContextProvider>
      <Container className={classes.root}>
        <StorageTab
          startingCourses={currentService ? currentService.startingCourses : []}
        />
        <ServiceTab service={currentService} serviceRef={currentServiceRef} />
      </Container>
    </StorageContextProvider>
  );
};

export default AdminPage;

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
