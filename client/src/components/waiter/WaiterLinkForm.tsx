import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ServiceContext } from '../../context/ServiceContext';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../fbConfig';

const useStyle = makeStyles(theme => ({
  input: {
    [theme.breakpoints.up('xs')]: {
      margin: 10
    }
  },
  fab: {
    position: 'fixed',
    bottom: 30,
    right: 30,
    zIndex: 200
  }
}));

export default function WaiterLinkForm() {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [orderNum, setOrderNum] = useState('');
  const [tableNum, setTableNum] = useState('');
  const { serviceRef } = useContext(ServiceContext);
  const { userId, userName } = useContext(AuthContext);
  const changeOpen = () => {
    setOpen(!open);
  };

  const createLink = () => {
    const toFullfill = [
      serviceRef
        .collection('orders')
        .where('status', '==', 'pending')
        .where('orderNum', '==', Number(orderNum))
        .get()
    ];
    toFullfill.push(
      serviceRef
        .collection('courses')
        .where('status', '==', 'wait')
        .where('orderNum', '==', Number(orderNum))
        .get()
    );
    Promise.all(toFullfill)
      .then(([orderSnap, coursesSnap]) => {
        if (orderSnap.size === 0) throw new Error('There is no document');
        else if (orderSnap.size > 1)
          throw new Error('There are too many docuemnts');
        else {
          const batch = db.batch();
          orderSnap.docs.forEach(doc => {
            batch.set(doc.ref, {
              ...doc.data(),
              tableNum: Number(tableNum),
              waiterId: userId,
              waiterName: userName,
              status: 'active'
            });
          });
          coursesSnap.docs.forEach(courseSnap => {
            batch.set(courseSnap.ref, {
              ...courseSnap.data(),
              waiterId: userId
            });
          });
          batch.commit();
        }
      })
      .then(() => {
        setOrderNum('');
        setTableNum('');
        changeOpen();
      })
      .catch(err => {
        console.error('ERROR IN CREATING LINK IN DB', err.message, err.stack);
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={changeOpen}>
        <DialogTitle>Prendi ordine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inserisci l'ordine che vuoi aggiungere e il suo tavolo
          </DialogContentText>
          <TextField
            autoFocus
            type="number"
            value={orderNum}
            error={orderNum !== '' && Number(orderNum) <= 0}
            autoComplete="off"
            margin="normal"
            id="name"
            label="Ordine"
            className={classes.input}
            onChange={e => {
              setOrderNum(e.target.value);
            }}
          />
          <TextField
            autoComplete="off"
            value={tableNum}
            error={tableNum !== '' && Number(tableNum) <= 0}
            type="number"
            margin="normal"
            id="name"
            label="Tavolo"
            className={classes.input}
            onChange={e => {
              setTableNum(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={changeOpen} color="secondary">
            Chiudi
          </Button>
          <Button
            onClick={createLink}
            color="primary"
            disabled={Number(orderNum) <= 0 || Number(tableNum) <= 0}
          >
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={changeOpen}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
