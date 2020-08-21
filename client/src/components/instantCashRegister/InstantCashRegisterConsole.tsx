import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import { CashRegisterContext } from '../../context/CashRegisterContext';
import { ActionType } from '../../reducers/CashRegisterReducer';
import { ServiceContext } from '../../context/ServiceContext';
import { IInstantOrder } from '../../../../types';

const consoleHeight = 250;

const useStyle = makeStyles(theme =>
  createStyles({
    console: {
      flexBasis: 90,
      height: consoleHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'sticky',
      top: `calc(50vh + 32px - ${consoleHeight / 2}px)`,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row',
        top: 80,
        maxWidth: consoleHeight,
        width: '100%',
        padding: theme.spacing(1)
      }
    },
    doneBtn: {
      borderRadius: '50%'
    }
  })
);

const InstantCashRegisterConsole: React.FunctionComponent = () => {
  const classes = useStyle();

  const { serviceRef } = useContext(ServiceContext);

  const { state, dispatch } = useContext(CashRegisterContext);

  const { courses, revenue, waitingToEndOrder } = state;

  const resetOrder = () => {
    dispatch({ type: ActionType.ResetState });
  };

  const sendOrder = () => {
    dispatch({
      type: ActionType.SendOrder
    });
    const newInstantOrder: IInstantOrder = {
      revenue,
      courses: courses.map(course => ({
        ...course,
        dihses: course.dishes.map(({ qt, price }) => ({ qt, price }))
      }))
    };
    serviceRef
      .collection('instantOrders')
      .add(newInstantOrder)
      .then(() => {
        dispatch({
          type: ActionType.InstantOrderCreated
        });
      })
      .catch(err => console.error('ERROR WHEN CREATING INSTANT ORDER: ', err));
  };

  return (
    <Paper elevation={6} className={classes.console}>
      <Typography variant="h6" color="secondary" style={{ margin: 10 }}>
        € {revenue}
      </Typography>
      <IconButton
        className={classes.doneBtn}
        color="primary"
        disabled={courses.length === 0 || waitingToEndOrder}
        onClick={sendOrder}
      >
        <DoneIcon fontSize="large" />
      </IconButton>

      <IconButton
        className={classes.doneBtn}
        color="secondary"
        onClick={resetOrder}
      >
        <ReplayIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default InstantCashRegisterConsole;
