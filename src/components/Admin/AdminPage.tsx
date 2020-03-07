import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import StorageTab from './StorageTab';
import ServiceTab from './ServiceTab';
import StorageContextProvider from '../../context/StorageContext';
import ServiceContextProvider from '../../context/ServiceContext';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
        flexDirection: 'column',
        padding: theme.spacing(1)
      }
    }
  })
);

const AdminPage = () => {
  const classes = useStyles();

  return (
    <StorageContextProvider>
      <ServiceContextProvider>
        <Container className={classes.root}>
          <StorageTab />
          <ServiceTab />
        </Container>
      </ServiceContextProvider>
    </StorageContextProvider>
  );
};

export default AdminPage;
