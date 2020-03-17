import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import StorageCourse from './StorageCourse';
import { StorageContext } from '../../context/StorageContext';
import { ServiceContext } from '../../context/ServiceContext';
import { IDish } from '../../../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  storageTab: {
    flex: 4,
    padding: theme.spacing(1, 3),
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 1),
      overflowY: 'visible'
    }
  }
}));

const StorageTab: React.FunctionComponent = () => {
  const classes = useStyles();
  const { storageDishes, courseNames } = useContext(StorageContext);
  const { service } = useContext(ServiceContext);
  let startingDishes: IDish[] = [];
  if (service) startingDishes = service.startingDishes;

  return (
    <Paper elevation={6} className={classes.storageTab}>
      {courseNames.map((courseName, i) => (
        <StorageCourse
          key={courseName}
          courseName={courseName}
          storageDishes={storageDishes.filter(
            dish => dish.courseName === courseName
          )}
          startingDishes={startingDishes.filter(
            dish => dish.courseName === courseName
          )}

          // TODO move starting dish storageDish took from service Context
        />
      ))}
    </Paper>
  );
};

export default StorageTab;
