import React, { Dispatch, SetStateAction, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import BreakLinkIcon from '@material-ui/icons/LinkOff';
import { ServiceContext } from '../../context/ServiceContext';
import { db } from '../../fbConfig';

interface IWaiterOrderTopBarProps {
  orderNum: number;
  tableNum: number;
  isEditingOrder: boolean;
  setIsEditingOrder: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  orderId: string;
  coursesIds: string[];
}

const useStyle = makeStyles(theme =>
  createStyles({
    topRow: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: theme.spacing(1)
    },
    expandIcon: {
      transition: '0.2s ease-out'
    }
  })
);

const WaiterOrderTopBar: React.FunctionComponent<IWaiterOrderTopBarProps> = props => {
  const classes = useStyle();
  const {
    orderNum,
    tableNum,
    isEditingOrder,
    setIsEditingOrder,
    show,
    setShow,
    orderId,
    coursesIds
  } = props;

  const { serviceRef } = useContext(ServiceContext);

  const unlinkOrder = () => {
    const batch = db.batch();
    batch.set(
      serviceRef.collection('orders').doc(orderId),
      {
        waiterId: null,
        tableNum: null,
        waiterName: null,
        status: 'pending'
      },
      { merge: true }
    );

    coursesIds.forEach(courseId =>
      batch.set(
        serviceRef.collection('courses').doc(courseId),
        {
          waiterId: null
        },
        { merge: true }
      )
    );

    batch
      .commit()
      .then(() => {
        console.info('Unlinked order');
      })
      .catch(err => {
        console.error(
          'ERROR WHEN UNLINKING ORDER FROM WAITER',
          err.message,
          err.stack
        );
      });
  };

  return (
    <div className={classes.topRow}>
      <Typography color="primary" variant="h5">
        T: {tableNum}
      </Typography>
      <Typography color="primary" variant="h5">
        O: {orderNum}
      </Typography>

      {show && (
        <IconButton
          color="secondary"
          size="medium"
          onClick={() => setIsEditingOrder(!isEditingOrder)}
        >
          {isEditingOrder ? <CancelIcon /> : <EditIcon />}
        </IconButton>
      )}
      {isEditingOrder ? (
        <IconButton
          size="medium"
          onClick={unlinkOrder}
          className={classes.expandIcon}
          style={!show ? { transform: 'rotateZ(180deg)' } : {}}
        >
          <BreakLinkIcon fontSize="large" color="secondary" />
        </IconButton>
      ) : (
        <IconButton
          size="medium"
          onClick={() => setShow(!show)}
          className={classes.expandIcon}
          style={!show ? { transform: 'rotateZ(180deg)' } : {}}
        >
          <ExpandIcon fontSize="large" color="secondary" />
        </IconButton>
      )}
    </div>
  );
};

export default WaiterOrderTopBar;
