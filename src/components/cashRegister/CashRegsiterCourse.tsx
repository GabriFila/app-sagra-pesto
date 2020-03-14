import React from 'react';
import Paper from '@material-ui/core/Paper';
import { IStorageCourse } from '../../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CashRegisterDish from './CashRegisterDish';
import TextField from '@material-ui/core/TextField';

interface ICashRegisterProps {
  course: IStorageCourse;
}

const useStyle = makeStyles(theme =>
  createStyles({
    course: {
      padding: theme.spacing(3),
      width: '100%',
      maxWidth: 500,
      margin: 10,
      [theme.breakpoints.down('sm')]: {}
    },
    courseName: {
      paddingBottom: 10
    },
    notes: {
      margin: 20,
      width: '90%'
    }
  })
);
const CashRegisterCourse: React.FunctionComponent<ICashRegisterProps> = ({
  course
}) => {
  const classes = useStyle();
  return (
    <Paper elevation={6} className={classes.course}>
      <div
        id={course.name}
        style={{
          position: 'relative',
          top: '-80px',
          visibility: 'hidden',
          display: 'block'
        }}
      ></div>
      <Typography color="primary" variant="h5" className={classes.courseName}>
        {course.name}
      </Typography>
      {course.dishes
        .filter(dish => dish.isInMenu)
        .map(dish => (
          <CashRegisterDish key={dish.shortName} dish={dish} />
        ))}
      <TextField
        multiline
        rows="2"
        placeholder={`Note ${course.name}`}
        variant="standard"
        className={classes.notes}
      />
    </Paper>
  );
};

export default CashRegisterCourse;
