import React, { Dispatch, SetStateAction } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandIcon from '@material-ui/icons/ExpandMore';

interface IWaiterOrderTopBarProps {
  orderNum: number;
  tableNum: number;
  isEditingOrder: boolean;
  setIsEditingOrder: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
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

const WaiterOrderTopBar: React.FunctionComponent<IWaiterOrderTopBarProps> = props => {
  const classes = useStyle();
  const {
    orderNum,
    tableNum,
    isEditingOrder,
    setIsEditingOrder,
    show,
    setShow
  } = props;
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
      {isEditingOrder && (
        <IconButton
          color="secondary"
          size="medium"
          onClick={() => setIsEditingOrder(!isEditingOrder)}
        >
          <DoneIcon color="secondary" />
        </IconButton>
      )}
      {!isEditingOrder && (
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
