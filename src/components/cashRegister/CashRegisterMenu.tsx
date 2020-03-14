import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CashRegisterCourse from './CashRegsiterCourse';
import { StorageContext } from '../../context/StorageContext';

interface ICashRegisterMenuProps {}

const useStyle = makeStyles(theme =>
  createStyles({
    menu: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      flex: 1,
      width: '100%'
    }
  })
);
const CashRegisterMenu: React.FunctionComponent<ICashRegisterMenuProps> = () => {
  const classes = useStyle();
  const { storageCourses } = useContext(StorageContext);
  return (
    <div className={classes.menu}>
      {storageCourses.map(course => (
        <CashRegisterCourse key={course.name} course={course} />
      ))}
    </div>
  );
};

export default CashRegisterMenu;
