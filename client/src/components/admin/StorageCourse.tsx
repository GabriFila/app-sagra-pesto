import React from 'react';
import { IStorageDish } from '../../../../types';
import StorageDish from './StorageDish';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

const useStyle = makeStyles(theme =>
  createStyles({
    storageCourse: { margin: theme.spacing(5, 0) }
  })
);

interface IStorageCourseProps {
  courseDishes: IStorageDish[];
  courseName: string;
  kitchen: string;
  isInstant: boolean;
}

const StorageCourse: React.FunctionComponent<IStorageCourseProps> = props => {
  const classes = useStyle();
  const { courseDishes, courseName, kitchen, isInstant } = props;
  return (
    <div className={classes.storageCourse}>
      <Typography color="primary" variant="h5">
        {courseName} {isInstant && ' - istantanea'} @ {kitchen}
      </Typography>
      {courseDishes.map((dish, i) => (
        <StorageDish
          name={dish.name}
          price={dish.price}
          storageQt={dish.qt}
          shortName={dish.shortName}
          isInMenu={dish.isInMenu}
          key={dish.name}
        />
      ))}
    </div>
  );
};

export default React.memo(StorageCourse);
