import React, { useState, useContext, useEffect } from 'react';
import WaiterLinkForm from './WaiterLinkForm';
import { ServiceContext } from '../../context/ServiceContext';
import { AuthContext } from '../../context/AuthContext';
import { IDBCourse, IDBOrder, CourseStatus } from '../../../../types';
import WaiterOrder from './WaiterOrder';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
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
    const unsubscribeOrders = serviceRef
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
    const notDeletedStatus: CourseStatus[] = [
      'wait',
      'prep',
      'ready',
      'delivered'
    ];
    const unsubscribeCourses = serviceRef
      .collection('courses')
      .where('waiterId', '==', userId)
      .where('status', 'in', notDeletedStatus)
      .onSnapshot(
        coursesSnap => {
          setCourses(
            coursesSnap.docs.map(doc => ({
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
    return () => {
      unsubscribeOrders();
      unsubscribeCourses();
    };
  }, [serviceRef, userId]);

  return (
    <div className={classes.orderList}>
      <WaiterLinkForm />
      <ResponsiveGrid
        elementsList={orders
          .sort((a, b) => a.orderNum - b.orderNum)
          .map(({ orderNum, tableNum, orderId, note }) => (
            <WaiterOrder
              key={orderNum}
              orderNum={orderNum}
              tableNum={tableNum}
              orderId={orderId}
              note={note}
              courses={courses.filter(course => course.orderNum === orderNum)}
            />
          ))}
      />
    </div>
  );
}

export default withServiceActive(WaiterPage);
