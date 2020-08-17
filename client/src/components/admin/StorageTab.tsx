import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import StorageCourse from './StorageCourse';
import { StorageContext } from '../../context/StorageContext';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(theme => ({
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
  const classes = useStyle();
  const { storageCourses } = useContext(StorageContext);

  return (
    <>
      {storageCourses !== undefined ? (
        <Paper elevation={6} className={classes.storageTab}>
          {storageCourses.map(({ courseName, dishes, kitchen, isInstant }) => (
            <StorageCourse
              key={courseName}
              courseName={courseName}
              courseDishes={dishes}
              kitchen={kitchen}
              isInstant={isInstant}
            />
          ))}
        </Paper>
      ) : (
        <Typography variant="h4" color="error">
          Ci sono dei problemi con l'app, chiedi a Gengio
        </Typography>
      )}
    </>
  );
};

export default StorageTab;
