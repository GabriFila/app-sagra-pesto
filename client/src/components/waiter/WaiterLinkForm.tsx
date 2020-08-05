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
import { makeStyles } from '@material-ui/core/styles';
import { ServiceContext } from '../../context/ServiceContext';
import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  input: {
    [theme.breakpoints.up('xs')]: {
      margin: 10
    }
  },
  fab: {
    position: 'fixed',
    bottom: 30,
    right: 30
  }
}));

export default function WaiterLinkForm() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [orderNum, setOrderNum] = useState('');
  const [tableNum, setTableNum] = useState('');
  const { serviceRef } = useContext(ServiceContext);
  const { userId, userName } = useContext(AuthContext);
  const changeOpen = () => {
    setOpen(!open);
  };

  const createLink = () => {
    serviceRef
      .collection('orders')
      .where('orderNum', '==', Number(orderNum))
      .where('tableNum', '==', null)
      .get()
      .then(snap => {
        if (snap.size === 0) throw new Error('There is no document');
        else if (snap.size > 1) throw new Error('There are too many docuemnts');
        else {
          snap.docs.forEach(doc =>
            doc.ref.set(
              {
                tableNum: Number(tableNum),
                waiterId: userId,
                waiterName: userName
              },
              { merge: true }
            )
          );
        }
      })
      .then(() => changeOpen())
      .catch(err => {
        console.error('ERROR IN CREATING LINK IN DB', err.message, err.stack);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={changeOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Prendi ordine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inserisci l'ordine che vuoi aggiungere e il suo tavolo
          </DialogContentText>
          <TextField
            autoFocus
            type="number"
            value={orderNum}
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
          <Button onClick={createLink} color="primary">
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
