import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import ServiceStarter from './ServiceStarter';
import ServiceInfo from './ServiceInfo';
import { ServiceContext } from '../../context/ServiceContext';

const useStyle = makeStyles((theme: Theme) =>
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
        padding: 0,
        marginTop: 30
      }
    }
  })
);
const ServiceTab: React.FunctionComponent = () => {
  const classes = useStyle();

  const { service, serviceRef } = useContext(ServiceContext);
  const {
    totalInstantOrders,
    totalInstantRevenue,
    totalOrders,
    totalPeople,
    totalRevenue,
    start
  } = service || {};
  console.log(start);
  return (
    <Container className={classes.inner}>
      <ServiceStarter
        isServiceActive={service !== undefined}
        serviceRef={serviceRef}
      />
      {service !== undefined ? (
        <ServiceInfo
          totalInstantOrders={totalInstantOrders}
          totalInstantRevenue={totalInstantRevenue}
          totalOrders={totalOrders}
          totalPeople={totalPeople}
          totalRevenue={totalRevenue}
          start={start}
        />
      ) : null}
    </Container>
  );
};

export default ServiceTab;
