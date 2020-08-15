import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { IDBCourse } from '../../../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import WaiterCouse from './WaiterCourse';

interface IWaiterOrderProps {
  orderNum: number;
  orderId: string;
  tableNum: number;
  courses: IDBCourse[];
  visual: 'waiter' | 'kitchen' | 'hub';
  // status: string; // (pending, active, completed, deleted)
  // waiterName: string; // display name of waiter
  // waiterId: string; // id of waiter to link
  // revenue: number;
  // note?: string;
}

const useStyle = makeStyles(theme =>
  createStyles({
    order: {
      padding: theme.spacing(1),
      width: '100%',
      margin: theme.spacing(2, 0)
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
    }
  })
);

const WaiterOrder: React.FunctionComponent<IWaiterOrderProps> = props => {
  const classes = useStyle();
  const { orderNum, tableNum, courses } = props;
  const [show, setShow] = useState(true);

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
      <div className={classes.topRow}>
        <Typography color="primary" variant="h5">
          T: {tableNum}
        </Typography>
        <Typography color="primary" variant="h5">
          O: {orderNum}
        </Typography>
        <IconButton
          size="medium"
          onClick={() => setShow(!show)}
          className={classes.expandIcon}
          style={!show ? { transform: 'rotateZ(180deg)' } : {}}
        >
          <ExpandIcon fontSize="large" color="secondary" />
        </IconButton>
      </div>
      {show &&
        courses.map(({ courseName, dishes, status, courseId }) => (
          <WaiterCouse
            key={courseName}
            courseName={courseName}
            dishes={dishes}
            status={status}
            courseId={courseId}
          />
        ))}
    </Paper>
  );
};

export default React.memo(WaiterOrder);
