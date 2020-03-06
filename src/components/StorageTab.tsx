import React from 'react';
import { IStartingCourses, IStorageCourse } from '../../types';
import Paper from '@material-ui/core/Paper';
interface IStorageTabProps {
  startingCourses: IStartingCourses[];
  storageCourses: IStorageCourse[];
}
const StorageTab: React.FunctionComponent<IStorageTabProps> = () => {
  return (
    <Paper elevation={6} style={{ flex: 4 }}>
      ciaoooo
    </Paper>
  );
};

export default StorageTab;
