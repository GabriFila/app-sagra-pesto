import React from 'react';
import Paper from '@material-ui/core/Paper';
import { IStorageCourse } from '../../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CashRegisterDish from './CashRegisterDish';

interface ICashRegisterProps {
  course: IStorageCourse;
}

const useStyle = makeStyles(theme =>
  createStyles({
    paper: {
      flex: 1,
      padding: theme.spacing(1)
    }
  })
);
const CashRegisterCourse: React.FunctionComponent<ICashRegisterProps> = ({
  course
}) => {
  const classes = useStyle();
  return (
    <Paper elevation={6} className={classes.paper} style={{ margin: 5 }}>
      <Typography color="primary" variant="h6">
        {course.name}
      </Typography>
      {course.dishes
        .filter(dish => dish.isInMenu)
        .map(dish => (
          <CashRegisterDish dish={dish} />
        ))}
    </Paper>
  );
};

export default CashRegisterCourse;
