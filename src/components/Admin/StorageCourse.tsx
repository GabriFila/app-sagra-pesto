import React from 'react';
import { IStorageCourse, IStartingCourse } from '../../../types';
import StorageDish from './StorageDish';
import { Typography, makeStyles, createStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const useStyle = makeStyles(theme =>
  createStyles({
    storageCourse: { margin: theme.spacing(5, 0) }
  })
);

interface IStorageCourseProps {
  storageCourse: IStorageCourse;
  startingCourse: IStartingCourse | undefined;
}

const StorageCourse: React.FunctionComponent<IStorageCourseProps> = ({
  storageCourse,
  startingCourse
}) => {
  const classes = useStyle();
  return (
    <div className={classes.storageCourse}>
      <Typography color="primary" variant="h5">
        {storageCourse.name}
      </Typography>
      {storageCourse.dishes.map((dish, i) => (
        <div key={i}>
          <StorageDish
            storageDish={dish}
            startingDishQt={
              startingCourse
                ? startingCourse.dishes.find(
                    startDish => startDish.shortName === dish.shortName
                  ).qt
                : null
            }
          />
          {i === storageCourse.dishes.length - 1 ? null : <Divider />}
        </div>
      ))}
    </div>
  );
};

export default StorageCourse;
