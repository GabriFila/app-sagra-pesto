import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ServiceStarter from './ServiceStarter';
import ServiceInfo from './ServiceInfo';
import { ServiceContext } from '../../context/ServiceContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inner: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      flex: 1,
      height: '100%',
      alignSelf: 'center',
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
        flexDirection: 'column',
        padding: 0,
        marginTop: 30
      }
    }
  })
);
const ServiceTab: React.FunctionComponent = () => {
  const classes = useStyles();

  const { service, serviceRef } = useContext(ServiceContext);
  return (
    <Container className={classes.inner}>
      <ServiceStarter
        isServiceActive={service !== undefined}
        serviceRef={serviceRef}
      />
      {service !== undefined ? <ServiceInfo service={service} /> : null}
    </Container>
  );
};

export default ServiceTab;
