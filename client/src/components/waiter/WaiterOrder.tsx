import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { IDBCourse } from '../../../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import WaiterOrderEditMode from './WaiterOrderEditMode';
import WaiterOrderNormalMode from './WaiterOrderNormalMode';
import WaiterOrderTopBar from './WaiterOrderTopBar';

interface IWaiterOrderProps {
  orderNum: number;
  tableNum: number;
  courses: IDBCourse[];
  note?: string;
  orderId: string;
  // status: string; // (pending, active, completed, deleted)
  // waiterName: string; // display name of waiter
  // waiterId: string; // id of waiter to link
  // revenue: number;
}

const useStyle = makeStyles(theme =>
  createStyles({
    order: {
      padding: theme.spacing(1),
      width: '100%',
      margin: theme.spacing(2, 0),
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center'
    },
    topRow: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: theme.spacing(1)
    },
    expandIcon: {
      transition: '0.2s ease-out'
    },
    ready: {
      animationName: '$blinker',
      animationDuration: '1.5s',
      animationTimingFunction: 'ease-out',
      animationIterationCount: 'infinite'
    },
    '@keyframes blinker': {
      '0%': { backgroundColor: theme.palette.background.paper },
      '50%': { backgroundColor: theme.palette.warning.light },
      '100%': { backgroundColor: theme.palette.background.paper }
    },
    noteSection: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    note: {
      padding: theme.spacing(1),
      width: '100%',
      maxWidth: 500,
      margin: 5
    },
    newCourseSelector: {
      width: '10%',
      minWidth: 200
    }
  })
);
const WaiterOrder: React.FunctionComponent<IWaiterOrderProps> = props => {
  const classes = useStyle();
  const { orderNum, tableNum, courses, note, orderId } = props;
  const [show, setShow] = useState(true);
  const [isEditingOrder, setIsEditingOrder] = useState(false);

  return (
    <Paper
      elevation={4}
      className={`${classes.order} ${
        !show && courses.some(({ status }) => status === 'ready')
          ? classes.ready
          : ''
      }`}
      onClick={() => {
        if (!show) setShow(true);
      }}
    >
      <WaiterOrderTopBar
        setIsEditingOrder={setIsEditingOrder}
        setShow={setShow}
        show={show}
        isEditingOrder={isEditingOrder}
        orderNum={orderNum}
        tableNum={tableNum}
      />
      {show &&
        (isEditingOrder ? (
          <WaiterOrderEditMode courses={courses} />
        ) : (
          <WaiterOrderNormalMode
            courses={courses}
            note={note}
            orderId={orderId}
          />
        ))}
    </Paper>
  );
};

export default React.memo(WaiterOrder);
