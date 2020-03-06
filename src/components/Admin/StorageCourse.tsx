import React from 'react';
import { IStorageCourse } from '../../../types';
import StorageDish from './StorageDish';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

interface IStorageCourseProps {
  storageCourse: IStorageCourse;
  startingCourse: IStorageCourse | undefined;
}

const StorageCourse: React.FunctionComponent<IStorageCourseProps> = ({
  storageCourse
}) => {
  return (
    <>
      <Typography color="primary" variant="h6">
        {storageCourse.name}
      </Typography>
      {storageCourse.dishes.map((dish, i) => (
        <div key={i}>
          <StorageDish storageDish={dish} startingDishQt={4} />
          {i === storageCourse.dishes.length - 1 ? null : <Divider />}
        </div>
      ))}
    </>
  );
};

export default StorageCourse;
