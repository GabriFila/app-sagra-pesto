import React, { useState, useEffect } from 'react';
import { IService } from '../../types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import getCurrentServiceRef from '../helpers/getCurrentServiceRef';
import { db } from '../fbConfig';

interface IServiceTabProps {
  //   service: IService;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inner: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      flex: 1,
      height: '100%',
      alignSelf: 'center',

      margin: theme.spacing(1)
    }
  })
);
// TODO add sagraContext with storaeRef and Service Ref
const ServiceTab: React.FunctionComponent<IServiceTabProps> = () => {
  const classes = useStyles();

  const [isServiceActive, setIsServiceActive] = useState(false);
  useEffect(() => {
    const unsubscribe = getCurrentServiceRef().onSnapshot(
      snaps => {
        if (snaps.docs.length == 0) setIsServiceActive(false);
        else if (snaps.docs.length > 1) {
          // TODO add error to tell user
        } else
          snaps.forEach(snap => {
            setIsServiceActive(true);
            console.log(snap.data());
          });
      },
      err => console.error(err)
    );
    return () => unsubscribe();
  }, []);

  return (
    <Container className={classes.inner} style={{ flex: 2 }}>
      <Paper
        elevation={6}
        style={{ display: 'flex', justifyContent: 'center', height: 70 }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: 'red', margin: 'auto' }}
        >
          Inizia servizio
        </Button>
      </Paper>
      <Paper elevation={6}>ciaoooo</Paper>
    </Container>
  );
};

export default ServiceTab;
