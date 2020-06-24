import React from 'react';
import { IStorageDish } from '../../../../types';
import StorageDish from './StorageDish';
import { Typography, makeStyles, createStyles } from '@material-ui/core';

const useStyle = makeStyles(theme =>
  createStyles({
    storageCourse: { margin: theme.spacing(5, 0) }
  })
);

interface IStorageCourseProps {
  courseDishes: IStorageDish[];
  courseName: string;
}

const StorageCourse: React.FunctionComponent<IStorageCourseProps> = ({
  courseDishes,
  courseName
}) => {
  const classes = useStyle();
  return (
    <div className={classes.storageCourse}>
      <Typography color="primary" variant="h5">
        {courseName}
      </Typography>
      {courseDishes.map((dish, i) => (
        <StorageDish
          name={dish.name}
          price={dish.price}
          storageQt={dish.storageQt}
          shortName={dish.shortName}
          isInMenu={dish.isInMenu}
          key={dish.name}
        />
      ))}
    </div>
  );
};

export default React.memo(StorageCourse);
