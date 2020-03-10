import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { IStorageCourse } from '../../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
const CashRegisterMenu: React.FunctionComponent<ICashRegisterMenuProps> = ({}) => {
  const classes = useStyle();
  const { storageCourses } = useContext(StorageContext);

  return (
    <div className={classes.menu}>
      {storageCourses.map(course => (
        <CashRegisterCourse course={course} />
      ))}
    </div>
  );
};

export default CashRegisterMenu;
