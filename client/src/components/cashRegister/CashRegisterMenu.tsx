import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CashRegisterCourse from './CashRegsiterCourse';
import { StorageContext } from '../../context/StorageContext';
import { CashRegisterContext } from '../../context/CashRegisterContext';

interface ICashRegisterMenuProps {}

const useStyle = makeStyles(theme =>
  createStyles({
    menu: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      width: '100%'
    }
  })
);
const CashRegisterMenu: React.FunctionComponent<ICashRegisterMenuProps> = () => {
  const classes = useStyle();
  const { storageCourses } = useContext(StorageContext);
  const { state } = useContext(CashRegisterContext);
  return (
    <div className={classes.menu}>
      {storageCourses.map(({ courseName, dishes, kitchen }) => (
        <CashRegisterCourse
          key={courseName}
          courseName={courseName}
          kitchen={kitchen}
          storageDishes={dishes}
          orderDishes={
            state.courses.filter(course => course.courseName === courseName)[0]
              ?.dishes
          }
        />
      ))}
    </div>
  );
};

export default CashRegisterMenu;
