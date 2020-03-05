import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import StorageTab from '../components/StorageTab';
import ServiceTab from '../components/ServiceTab';

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

const AdminPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <StorageTab startingCourses={[]} />
        <ServiceTab />
      </Container>
    </>
  );
};

export default AdminPage;
