import React, { useEffect, useState, useContext } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import withServiceActive from '../ShowWhenServiceIsActive';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
  pendingOrders: {
    fontSize: '1.5rem',
    padding: '2px 10px',
    margin: theme.spacing(0, 2),
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: theme.palette.error.light,
    color: theme.palette.text.primary,
    borderRadius: 5,
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
}));

const PendingOrders = () => {
  const classes = useStyle();
  const { serviceRef } = useContext(ServiceContext);

  const [pendingOrders, setPendingOrders] = useState<number[]>([]);

  useEffect(() => {
    const unsubsribe = serviceRef
      .collection('orders')
      .where('status', '==', 'pending')
      .onSnapshot(
        snap => {
          setPendingOrders(snap.docs.map(doc => doc.data().orderNum));
        },
        err => {
          console.error(
            'ERROR IN GETTING PENDING ORDERS :',
            err.message,
            err.stack
          );
        }
      );
    return () => {
      unsubsribe();
    };
  }, [serviceRef]);

  return (
    <>
      {pendingOrders.length > 0 && (
        <div className={classes.pendingOrders}>
          {pendingOrders
            .sort((a, b) => a - b)
            .map(orderNum => (
              <span key={orderNum}>{orderNum} </span>
            ))}
        </div>
      )}
    </>
  );
};

export default withServiceActive(PendingOrders);
