import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { IStorageDish, IOrderDish } from '../../../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Typography from '@material-ui/core/Typography';
import CashRegisterDish from './CashRegisterDish';
import TextField from '@material-ui/core/TextField';
import { CashRegisterContext } from '../../context/CashRegisterContext';
import { ActionType } from '../../reducers/CashRegisterReducer';

interface ICashRegisterCourseProps {
  courseName: string;
  kitchen: string;
  storageDishes: IStorageDish[];
  orderDishes: IOrderDish[];
}

const useStyle = makeStyles(theme =>
  createStyles({
    course: {
      padding: theme.spacing(3),
      width: '100%',
      maxWidth: 500,
      margin: 10
    },
    courseName: {
      paddingBottom: 10
    },
    notes: {
      margin: 20,

      width: '90%'
    },
    courseAnchor: {
      position: 'relative',
      top: '-80px',
      visibility: 'hidden',
      display: 'block'
    }
  })
);

const CashRegisterCourse: React.FunctionComponent<ICashRegisterCourseProps> = ({
  courseName,
  storageDishes: dishes,
  kitchen,
  orderDishes
}) => {
  const classes = useStyle();
  const { dispatch } = useContext(CashRegisterContext);
  return (
    <Paper elevation={6} className={classes.course}>
      <div id={courseName} className={classes.courseAnchor}></div>
      <Typography color="primary" variant="h5" className={classes.courseName}>
        {courseName}
      </Typography>
      {dishes
        .filter(({ isInMenu }) => isInMenu)
        .map(({ price, qt, shortName, name }) => (
          <CashRegisterDish
            key={shortName}
            name={name}
            kitchen={kitchen}
            price={price}
            storageQt={qt}
            shortName={shortName}
            courseName={courseName}
            orderQt={
              orderDishes &&
              orderDishes.find(dish => dish.shortName === shortName)?.qt
            }
          />
        ))}
      <TextField
        multiline
        rows="2"
        placeholder={`Note ${courseName}`}
        variant="standard"
        className={classes.notes}
        onChange={e =>
          dispatch({
            type: ActionType.ChangeNote,
            payload: { note: e.target.value, courseName, kitchen }
          })
        }
      />
    </Paper>
  );
};

export default React.memo(CashRegisterCourse);
