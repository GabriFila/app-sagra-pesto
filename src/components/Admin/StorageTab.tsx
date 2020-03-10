import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import StorageCourse from './StorageCourse';
import { StorageContext } from '../../context/StorageContext';
import { ServiceContext } from '../../context/ServiceContext';
import { IStartingCourse } from '../../../types';

const StorageTab: React.FunctionComponent = () => {
  const { storageCourses } = useContext(StorageContext);
  const { service } = useContext(ServiceContext);
  let startingCourses: IStartingCourse[] = [];
  if (service) startingCourses = service.startingCourses;

  return (
    <Paper
      elevation={6}
      style={{ flex: 4, padding: 8, height: 'auto', overflowY: 'scroll' }}
    >
      {storageCourses.map((course, i) => (
        <StorageCourse
          key={course.name}
          storageCourse={course}
          startingCourse={startingCourses.find(
            startingCourse => startingCourse.shortName === course.name
          )}
        />
      ))}
    </Paper>
  );
};

export default StorageTab;
