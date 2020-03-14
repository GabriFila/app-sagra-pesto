import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import PrintIcon from '@material-ui/icons/Print';
import ReplayIcon from '@material-ui/icons/Replay';
import { StorageContext } from '../../context/StorageContext';
import { CashRegisterContext } from '../../context/CashRegisterContext';

import { ActionType } from '../../reducers/CashRegisterReducer';
import printOrder from '../../helpers/printOrder';

interface ICashRegisterMenuProps {}
const consoleHeight = 300;
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
const CashRegisterConsole: React.FunctionComponent<ICashRegisterMenuProps> = () => {
  const classes = useStyle();

  const { storageCourses } = useContext(StorageContext);
  const { state, dispatch } = useContext(CashRegisterContext);

  const { dishes } = state;
  let total = 0;

  dishes.forEach(dishInOrder => {
    const { price } = storageCourses
      .find(course =>
        course.dishes.some(dish => dish.shortName === dishInOrder.shortName)
      )
      .dishes.find(dish => dish.shortName === dishInOrder.shortName);
    total += price * dishInOrder.qt;
  });

  const resetOrder = () => {
    dispatch({ type: ActionType.ResetOrder });
  };

  return (
    <Paper elevation={6} className={classes.console}>
      <Typography variant="h6" color="secondary">
        € {total}
      </Typography>
      <IconButton className={classes.doneBtn} color="primary">
        <DoneIcon fontSize="large" />
      </IconButton>
      <Typography
        variant="h5"
        style={{ border: '3px solid green', borderRadius: 10 }}
      >
        &nbsp; &nbsp; &nbsp; &nbsp;
      </Typography>
      <IconButton
        className={classes.doneBtn}
        color="primary"
        onClick={() => printOrder(storageCourses)}
      >
        <PrintIcon fontSize="large" />
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

export default CashRegisterConsole;
