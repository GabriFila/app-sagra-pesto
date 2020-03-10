import React, { useContext, useReducer } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CashRegisterCourse from './CashRegsiterCourse';
import withStorageContext, {
  StorageContext
} from '../../context/StorageContext';
import CashRegisterMenu from './CashRegisterMenu';
import CashRegisterReducer, {
  ICashRegisterReducerState
} from '../../reducers/CashRegisterReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
        padding: theme.spacing(1)
      }
    }
  })
);

const CashRegisterPage = () => {
  const classes = useStyles();

  const changedCourses = useContext(StorageContext).storageCourses.map(
    course => {
      return {
        name: course.name,
        dishes: course.dishes.map(dish => {
          return { shortName: dish.shortName, qt: 0, price: dish.price };
        })
      };
    }
  );

  const initialState: ICashRegisterReducerState = {
    orderNum: undefined,
    courses: changedCourses
  };

  const [state, dispatch] = useReducer(CashRegisterReducer, initialState);
  return (
    <Container className={classes.root}>
      <CashRegisterMenu />
    </Container>
  );
};
// TODO use context HOC
export default withStorageContext(CashRegisterPage);
// export default StorageContextProvider()(CashRegisterPage);
