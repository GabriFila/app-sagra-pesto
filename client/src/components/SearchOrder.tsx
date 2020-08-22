import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { ServiceContext } from '../context/ServiceContext';
import { IDBOrder, IDBCourse } from '../../../types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import WaiterOrder from './waiter/WaiterOrder';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(theme =>
  createStyles({
    peopleInput: {
      width: '100%',
      maxWidth: 60,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.palette.text.primary,
      borderRadius: 5
    }
  })
);

const SearchOrder = () => {
  const classes = useStyle();
  const [orderNum, setOrderNum] = useState('');
  const { serviceRef } = useContext(ServiceContext);
  const [order, setOrder] = useState<IDBOrder>();
  const [courses, setCourses] = useState<IDBCourse[]>([]);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const closeDialog = () => {
    setIsError(false);
    setOpen(false);
    setOrderNum('');
  };
  // TODO handle delete courses
  const getOrder = () => {
    serviceRef
      .collection('orders')
      .where('orderNum', '==', Number(orderNum))
      .onSnapshot(
        orderSnap => {
          if (orderSnap.size === 0) {
            console.error('ERROR IN GETTING ORDER', 'There is no order');
            setIsError(true);
          } else if (orderSnap.size > 1) {
            console.error(
              'ERROR IN GETTING ORDER',
              'There are multiple orders with the same num'
            );
            setIsError(true);
          } else {
            setOpen(true);
            orderSnap.docs.forEach(doc => {
              setOrder({ ...(doc.data() as IDBOrder), orderId: doc.id });
            });
          }
        },
        err => {
          console.error('ERROR IN GETTING ORDER', err.message, err.stack);
          setIsError(true);
        }
      );
    serviceRef
      .collection('courses')
      .where('orderNum', '==', Number(orderNum))
      .onSnapshot(
        coursesSnap => {
          if (coursesSnap.size === 0) {
            console.error('ERROR IN GETTING COURSES', 'There are no courses');
            setIsError(true);
            setOpen(true);
          } else {
            setCourses(
              coursesSnap.docs.map(doc => ({
                ...(doc.data() as IDBCourse),
                courseId: doc.id
              }))
            );
          }
        },
        err => {
          console.error('ERROR IN GETTING COURSES', err.message, err.stack);
          setIsError(true);
        }
      );
  };

  return (
    <>
      <TextField
        type="number"
        value={orderNum || ''}
        variant="outlined"
        margin="dense"
        inputProps={{ min: 0, style: { textAlign: 'center' } }}
        className={classes.peopleInput}
        onChange={e => {
          setOrderNum(e.target.value);
        }}
      />
      <IconButton onClick={getOrder} disabled={orderNum === ''}>
        <SearchIcon fontSize="large" />
      </IconButton>
      <Dialog open={open || isError} onClose={closeDialog} fullWidth={true}>
        <DialogTitle>{isError ? '' : `Ordine # ${orderNum}`}</DialogTitle>
        <DialogContent>
          {isError ? (
            <Typography color="error">C'è stato un errore</Typography>
          ) : (
            <WaiterOrder
              orderNum={Number(orderNum)}
              orderId={order?.orderId}
              tableNum={order?.tableNum}
              courses={courses}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchOrder;
