import React, { useState, useContext } from 'react';
import { IDBCourse } from '../../../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import EditableCourse from './EditableCourse';
import AddIcon from '@material-ui/icons/AddCircle';
import CheckIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { StorageContext } from '../../context/StorageContext';
import CashRegisterMenu from '../cashRegister/CashRegisterMenu';
import withCashRegisterContext from '../../context/CashRegisterContext';

interface IWaiterOrderEditModeProps {
  //   orderNum: number;
  //   tableNum: number;
  courses: IDBCourse[];
  //   note?: string;
  //   orderId: string;
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
const WaiterOrderEditMode: React.FunctionComponent<IWaiterOrderEditModeProps> = props => {
  const classes = useStyle();

  const { courses } = props;

  const { storageCourses } = useContext(StorageContext);

  console.log(storageCourses);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState('');

  return (
    <>
      {courses
        .filter(({ status }) => status === 'wait')
        .map(({ courseId, courseName, dishes }) => (
          <EditableCourse
            key={courseName}
            courseId={courseId}
            courseName={courseName}
            dishes={dishes}
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
        <CashRegisterMenu onlyInstant={false} whichCourse={newCourse} />
      )}
      <div>
        {isAddingCourse && (
          <IconButton
            color="secondary"
            onClick={() => {
              setIsAddingCourse(!isAddingCourse);
              setNewCourse('');
            }}
          >
            <CancelIcon />
          </IconButton>
        )}
        <IconButton
          color="secondary"
          onClick={() => {
            setIsAddingCourse(!isAddingCourse);
            setNewCourse('');
          }}
        >
          {isAddingCourse ? <CheckIcon /> : <AddIcon />}
        </IconButton>
      </div>
    </>
  );
};

export default withCashRegisterContext(WaiterOrderEditMode);
