import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import StorageTab from '../components/StorageTab';
import ServiceTab from '../components/ServiceTab';
import getCurrentServiceRef from '../helpers/getCurrentServiceRef';
import { IService, IStorage } from '../../types';
import getStorageRef from '../helpers/getStorageRef';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      height: 'calc(100% - 64px)',
      alignSelf: 'center',
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
        flexDirection: 'row'
      }
    }
  })
);

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

const AdminPage = () => {
  const classes = useStyles();

  const [currentServiceRef, setCurrentServiceRef] = useState();
  const [currentService, setCurrentService] = useState<IService | undefined>(
    undefined
  );
  const [storage, setStorage] = useState<IStorage>({ courses: [] });

  useEffect(() => {
    const unsubscribeService = getCurrentServiceRef().onSnapshot(
      snaps => {
        console.log(snaps.docs.length);
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
    const unsubscribeStorage = getStorageRef().onSnapshot(
      snap => {
        setStorage(snap.data() as IStorage);
      },
      err => console.error(err)
    );
    return () => {
      unsubscribeService();
      unsubscribeStorage();
    };
  }, []);

  return (
    <>
      <Container className={classes.root}>
        <StorageTab
          startingCourses={currentService ? currentService.startingCourses : []}
          storageCourses={storage.courses}
        />
        <ServiceTab service={currentService} serviceRef={currentServiceRef} />
      </Container>
    </>
  );
};

export default AdminPage;
