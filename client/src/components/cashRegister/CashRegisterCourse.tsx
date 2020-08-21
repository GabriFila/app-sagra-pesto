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
  dishes: IStorageDish[];
  orderDishes: IOrderDish[];
  onlyInstant: boolean;
  isWaiter: boolean;
}

const useStyle = makeStyles(theme =>
  createStyles({
    course: {
      padding: theme.spacing(3),
      width: '100%',
      maxWidth: 500,
      margin: 10,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2)
      }
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

const CashRegisterCourse: React.FunctionComponent<ICashRegisterCourseProps> = props => {
  const classes = useStyle();
  const { dispatch } = useContext(CashRegisterContext);

  const {
    courseName,
    dishes,
    kitchen,
    orderDishes,
    onlyInstant,
    isWaiter
  } = props;

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
            isWaiter={isWaiter}
            orderQt={
              orderDishes &&
              orderDishes.find(dish => dish.shortName === shortName)?.qt
            }
          />
        ))}
      {!onlyInstant && (
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
      )}
    </Paper>
  );
};

export default React.memo(CashRegisterCourse);
