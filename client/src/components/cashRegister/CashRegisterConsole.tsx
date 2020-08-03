import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import PrintIcon from '@material-ui/icons/Print';
import ReplayIcon from '@material-ui/icons/Replay';
import { StorageContext } from '../../context/StorageContext';
import { CashRegisterContext } from '../../context/CashRegisterContext';
import { ActionType } from '../../reducers/CashRegisterReducer';
import printOrder from '../../helpers/printOrder';
import { functions } from '../../fbConfig';
import { ServiceContext } from '../../context/ServiceContext';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { disableUIOnCondition } from '../../helpers/disableUIOnCondition';

const createOrder = functions.httpsCallable('createOrder');

const consoleHeight = 400;
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
        top: 80,
        maxWidth: consoleHeight,
        width: '100%',
        padding: theme.spacing(1)
      }
    },
    consoleSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row',
        top: 80,
        maxWidth: consoleHeight,
        width: '100%',
        padding: theme.spacing(1)
      }
    },
    peopleSelector: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row-reverse'
      }
    },
    peopleInput: {
      width: '100%',
      maxWidth: 60
    },
    doneBtn: {
      borderRadius: '50%'
    },
    orderNum: {
      border: '3px solid green',
      borderRadius: 10,
      cursor: 'default',
      padding: 3
    }
  })
);

const CashRegisterConsole: React.FunctionComponent = () => {
  const classes = useStyle();

  const { storageCourses } = useContext(StorageContext);
  const { serviceId } = useContext(ServiceContext);

  const { state, dispatch } = useContext(CashRegisterContext);

  const {
    courses,
    people,
    revenue,
    orderNote,
    orderNum,
    waitingOrderRes,
    waitingToEndOrder
  } = state;

  const resetOrder = () => {
    dispatch({ type: ActionType.ResetOrder });
  };

  const sendOrder = () => {
    dispatch({
      type: ActionType.SendOrder
    });
    createOrder({ revenue, courses, people, serviceId, orderNote })
      .then(res => {
        const { outcome, newOrderNum } = res.data;
        if (outcome) {
          dispatch({
            type: ActionType.OrderReceived,
            payload: { orderNum: newOrderNum }
          });
        } else {
        }
      })
      .catch(err => console.error('ERROR WHEN CREATING ORDER: ', err));
  };

  return (
    <Paper
      elevation={6}
      className={classes.console}
      style={disableUIOnCondition(waitingOrderRes)}
    >
      <div
        className={classes.consoleSection}
        style={disableUIOnCondition(waitingToEndOrder)}
      >
        <div className={classes.peopleSelector}>
          <IconButton
            onClick={() => {
              dispatch({
                type: ActionType.AddPerson
              });
            }}
            color="primary"
          >
            <AddIcon style={{ flex: 1 }} />
          </IconButton>
          <TextField
            type="number"
            value={people || ''}
            variant="outlined"
            margin="dense"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            className={classes.peopleInput}
            onChange={e => {
              const newPeople = Number(e.target.value) || undefined;
              dispatch({
                type: ActionType.SetPeople,
                payload: { people: newPeople }
              });
            }}
          />
          <IconButton
            disabled={people === undefined || people === 0}
            onClick={() => {
              dispatch({
                type: ActionType.RemovePerson
              });
            }}
            color="secondary"
          >
            <RemoveIcon style={{ flex: 1 }} />
          </IconButton>
        </div>
        <Typography variant="h6" color="secondary">
          € {revenue}
        </Typography>
        <IconButton
          className={classes.doneBtn}
          color="primary"
          disabled={
            courses.length === 0 || people === 0 || people === undefined
          }
          onClick={sendOrder}
        >
          <DoneIcon fontSize="large" />
        </IconButton>
      </div>

      <div className={classes.consoleSection}>
        <Typography
          variant="h5"
          className={classes.orderNum}
          style={{
            color: orderNum ? 'black' : 'white'
          }}
        >
          {orderNum || 123}
        </Typography>
        <IconButton
          className={classes.doneBtn}
          color="primary"
          onClick={() =>
            printOrder(storageCourses, courses, orderNum, revenue, people)
          }
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
      </div>
    </Paper>
  );
};

export default CashRegisterConsole;
