import React from 'react';
import { IStorageCourse, IStartingCourse } from '../../../types';
import StorageDish from './StorageDish';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

interface IStorageCourseProps {
  storageCourse: IStorageCourse;
  startingCourse: IStartingCourse | undefined;
}

const StorageCourse: React.FunctionComponent<IStorageCourseProps> = ({
  storageCourse,
  startingCourse
}) => {
  return (
    <div style={{ marginTop: 5, marginBottom: 5 }}>
      <Typography color="primary" variant="h6">
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
