import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CashRegisterCourse from './CashRegisterCourse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { StorageContext } from '../../context/StorageContext';
import { CashRegisterContext } from '../../context/CashRegisterContext';
import { ActionType } from '../../reducers/CashRegisterReducer';
import { disableUIOnCondition } from '../../helpers/disableUIOnCondition';

interface ICashRegisterMenuProps {
  onlyInstant: boolean;
  whichCourse: string | undefined;
  isWaiter: boolean;
}

const useStyle = makeStyles(theme =>
  createStyles({
    menu: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      width: '100%'
    },
    notes: {
      width: '90%'
    },
    orderNote: {
      padding: theme.spacing(3),
      width: '100%',
      maxWidth: 500,
      margin: 10
    }
  })
);
const CashRegisterMenu: React.FunctionComponent<ICashRegisterMenuProps> = props => {
  const classes = useStyle();
  const { storageCourses } = useContext(StorageContext);
  const { state, dispatch } = useContext(CashRegisterContext);
  const { courses, waitingOrderRes, waitingToEndOrder } = state;
  const {
    onlyInstant,
    // singleCourse,
    whichCourse,
    isWaiter
  } = props;

  return (
    <div
      className={classes.menu}
      style={disableUIOnCondition(waitingOrderRes || waitingToEndOrder, true)}
    >
      {!onlyInstant && whichCourse === undefined && (
        <Paper className={classes.orderNote} elevation={6}>
          <TextField
            multiline
            rows="2"
            placeholder={'Note ordine'}
            variant="standard"
            className={classes.notes}
            onChange={e =>
              dispatch({
                type: ActionType.ChangeOrderNote,
                payload: { note: e.target.value }
              })
            }
          />
        </Paper>
      )}
      {storageCourses
        .filter(({ isInstant, courseName }) =>
          whichCourse === undefined
            ? !onlyInstant || isInstant
            : courseName === whichCourse
        )
        .map(({ courseName, dishes, kitchen }) => (
          <CashRegisterCourse
            isWaiter={isWaiter}
            key={courseName}
            courseName={courseName}
            kitchen={kitchen}
            dishes={dishes}
            onlyInstant={onlyInstant}
            orderDishes={
              courses.find(course => course.courseName === courseName)?.dishes
            }
          />
        ))}
    </div>
  );
};

export default CashRegisterMenu;
