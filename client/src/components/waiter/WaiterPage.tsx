import React, { useState, useContext, useEffect } from 'react';
import WaiterLinkForm from './WaiterLinkForm';
import { ServiceContext } from '../../context/ServiceContext';
import { AuthContext } from '../../context/AuthContext';
import { IDBCourse, IDBOrder } from '../../../../types';
import WaiterOrder from './WaiterOrder';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import withServiceActive from '../ShowWhenServiceIsActive';
import ResponsiveGrid from '../ResponsiveGrid';

const useStyle = makeStyles(theme =>
  createStyles({
    orderList: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      width: '100%',
      margin: 10
    }
  })
);

function WaiterPage() {
  const classes = useStyle();
  const { serviceRef } = useContext(ServiceContext);
  const { userId } = useContext(AuthContext);
  const [orders, setOrders] = useState<IDBOrder[]>([]);
  const [courses, setCourses] = useState<IDBCourse[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    unsubscribe = serviceRef
      .collection('orders')
      .where('waiterId', '==', userId)
      .onSnapshot(
        snap => {
          setOrders(
            snap.docs.map(doc => ({
              ...doc.data(),
              orderId: doc.id
            })) as IDBOrder[]
          );
        },
        err =>
          console.error(
            "ERROR IN GETTING WAITER'S ORDERS",
            err.message,
            err.stack
          )
      );
    return () => {
      unsubscribe();
    };
  }, [serviceRef, userId]);

  useEffect(() => {
    let unsubscribe: () => void;

    if (orders.length !== 0) {
      unsubscribe = serviceRef
        .collection('courses')
        .where(
          'orderNum',
          'in',
          orders.map(order => order.orderNum)
        )
        .onSnapshot(
          snap => {
            setCourses(
              snap.docs.map(doc => ({
                ...doc.data(),
                courseId: doc.id
              })) as IDBCourse[]
            );
          },
          err =>
            console.error(
              "ERROR IN GETTING WAITER'S ORDERS",
              err.message,
              err.stack
            )
        );
    }
    return () => {
      if (orders.length !== 0) unsubscribe();
    };
  }, [serviceRef, orders]);
  return (
    <div className={classes.orderList}>
      <WaiterLinkForm />
      <ResponsiveGrid
        elementList={orders
          .sort((a, b) => a.orderNum - b.orderNum)
          .map(({ orderNum, tableNum, orderId }) => (
            <WaiterOrder
              key={orderNum}
              visual="waiter"
              orderNum={orderNum}
              tableNum={tableNum}
              orderId={orderId}
              courses={courses.filter(course => course.orderNum === orderNum)}
            />
          ))}
      />
    </div>
  );
}

export default withServiceActive(WaiterPage);
