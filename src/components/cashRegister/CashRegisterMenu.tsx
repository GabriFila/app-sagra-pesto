import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CashRegisterCourse from './CashRegsiterCourse';
import { StorageContext } from '../../context/StorageContext';

interface ICashRegisterMenuProps {}

const useStyle = makeStyles(theme =>
  createStyles({
    paper: {
      flex: 1,
      padding: theme.spacing(1)
    },
    menu: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)'
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
