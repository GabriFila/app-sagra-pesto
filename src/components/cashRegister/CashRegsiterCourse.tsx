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
    paper: {
      // flex: 1,
      padding: theme.spacing(1),
      width: '100%',
      maxWidth: 600,
      margin: 5,
      [theme.breakpoints.down('sm')]: {}
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
    <Paper elevation={6} className={classes.paper}>
      <Typography color="primary" variant="h6">
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
