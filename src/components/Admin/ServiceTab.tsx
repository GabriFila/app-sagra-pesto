import React from 'react';
import { IService } from '../../../types';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ServiceStarter from './ServiceStarter';
import ServiceInfo from './ServiceInfo';

interface IServiceTabProps {
  service: IService | undefined;
  serviceRef: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inner: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      height: '100%',
      alignSelf: 'center',
      margin: theme.spacing(1)
    }
  })
);
const ServiceTab: React.FunctionComponent<IServiceTabProps> = ({
  serviceRef,
  service
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.inner} style={{ flex: 2 }}>
      <ServiceStarter
        isServiceActive={service !== undefined}
        serviceRef={serviceRef}
      />
      {service !== undefined ? <ServiceInfo service={service} /> : null}
    </Container>
  );
};

export default ServiceTab;
