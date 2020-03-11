import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import StorageTab from './StorageTab';
import ServiceTab from './ServiceTab';
import withStorageContext from '../../context/StorageContext';
import withServiceContext from '../../context/ServiceContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      height: 'calc(100vh - 80px)',
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
    <Container className={classes.root}>
      <StorageTab />
      <ServiceTab />
    </Container>
  );
};

export default withStorageContext(withServiceContext(AdminPage));
