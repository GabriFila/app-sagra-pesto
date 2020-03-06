import React, { useContext } from 'react';
import { IStartingCourses } from '../../../types';
import Paper from '@material-ui/core/Paper';
import StorageCourse from './StorageCourse';
import { StorageContext } from '../../context/StorageContext';
interface IStorageTabProps {
  startingCourses: IStartingCourses[];
}
const StorageTab: React.FunctionComponent<IStorageTabProps> = ({
  startingCourses
}) => {
  const { storageCourses } = useContext(StorageContext);
  console.log(storageCourses);

  return (
    <Paper elevation={6} style={{ flex: 4, padding: 8 }}>
      {storageCourses.map((course, i) => (
        <StorageCourse
          key={course.name}
          storageCourse={course}
          startingCourse={undefined}
        />
      ))}
    </Paper>
  );
};

export default StorageTab;
