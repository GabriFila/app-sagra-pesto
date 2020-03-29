import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CashRegisterCourse from './CashRegsiterCourse';
import { StorageContext } from '../../context/StorageContext';

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
  const { storageDishes, courseNames } = useContext(StorageContext);
  return (
    <div className={classes.menu}>
      {courseNames.map(courseName => (
        <CashRegisterCourse
          key={courseName}
          courseName={courseName}
          storageDishes={storageDishes.filter(
            dish => dish.courseName === courseName
          )}
        />
      ))}
    </div>
  );
};

export default CashRegisterMenu;
