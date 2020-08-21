import React, { useState, useContext } from 'react';
import { IDBCourse } from '../../../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import CheckIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { StorageContext } from '../../context/StorageContext';
import CashRegisterMenu from '../cashRegister/CashRegisterMenu';
import withCashRegisterContext, {
  CashRegisterContext
} from '../../context/CashRegisterContext';
import { functions } from '../../fbConfig';
import { ServiceContext } from '../../context/ServiceContext';
import WaiterCourse from './WaiterCourse';
import { ActionType } from '../../reducers/CashRegisterReducer';
import ErrorDialog from '../ErrorDialog';
interface IWaiterOrderEditModeProps {
  oldCourses: IDBCourse[];
  orderId: string;
}

const useStyle = makeStyles(theme =>
  createStyles({
    newCourseSelector: {
      width: '80%',
      minWidth: 200,
      margin: theme.spacing(2, 0)
    }
  })
);
const addCoursesToOrder = functions.httpsCallable('addCoursesToOrder');

const WaiterOrderEditMode: React.FunctionComponent<IWaiterOrderEditModeProps> = props => {
  const classes = useStyle();

  const { oldCourses, orderId } = props;

  const { serviceId } = useContext(ServiceContext);
  const { storageCourses } = useContext(StorageContext);
  const { state, dispatch } = useContext(CashRegisterContext);
  const { courses, revenue, isError } = state;
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState('');

  const addCourseInDB = () => {
    dispatch({ type: ActionType.SendOrder });
    addCoursesToOrder({
      orderId,
      courses,
      revenue,
      serviceId
    })
      .then(() => {
        dispatch({ type: ActionType.ResetState });
        setIsAddingCourse(!isAddingCourse);
        setNewCourse('');
      })
      .catch(err => {
        dispatch({ type: ActionType.TriggerError });
        console.error(
          'ERROR IN ADDING COURSES TO ORDER',
          err.message,
          err.stack
        );
      });
  };

  return (
    <>
      {oldCourses
        .filter(({ status }) => status === 'wait')
        .map(({ courseId, courseName, dishes, status }) => (
          <WaiterCourse
            key={courseId}
            courseId={courseId}
            courseName={courseName}
            dishes={dishes}
            status={status}
            isEditing={true}
          />
        ))}
      {isAddingCourse && (
        <TextField
          select
          value={newCourse}
          onChange={e => {
            setNewCourse(e.target.value);
          }}
          className={classes.newCourseSelector}
          label="Nuova portata"
        >
          {storageCourses
            .map(course => course.courseName)
            .map(courseName => (
              <MenuItem key={courseName} value={courseName}>
                {courseName}
              </MenuItem>
            ))}
        </TextField>
      )}
      {newCourse !== '' && (
        <CashRegisterMenu
          onlyInstant={false}
          whichCourse={newCourse}
          isWaiter={true}
        />
      )}
      <div>
        {isAddingCourse && (
          <IconButton
            color="secondary"
            onClick={() => {
              setIsAddingCourse(!isAddingCourse);
              setNewCourse('');
              dispatch({ type: ActionType.ResetState });
            }}
          >
            <CancelIcon />
          </IconButton>
        )}
        {newCourse !== '' && <>€ {revenue}</>}
        {isAddingCourse ? (
          <IconButton
            color="secondary"
            onClick={addCourseInDB}
            disabled={courses.length === 0 || revenue === 0}
          >
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton
            color="secondary"
            onClick={() => {
              setIsAddingCourse(true);
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </div>
      <ErrorDialog
        open={isError}
        description="C'è stato un errore nell'aggiungere una portata all'ordine"
        closeAction={() => {
          dispatch({ type: ActionType.ResetState });
          setIsAddingCourse(false);
          setNewCourse('');
        }}
      />
    </>
  );
};

export default withCashRegisterContext(WaiterOrderEditMode);
