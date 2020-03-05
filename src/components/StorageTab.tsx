import React from 'react';
import { ICourse } from '../../types';
import Paper from '@material-ui/core/Paper';
interface IStorageTabProps {
  startingCourses: ICourse[];
}
const StorageTab: React.FunctionComponent<IStorageTabProps> = () => {
  return (
    <Paper elevation={6} style={{ flex: 4 }}>
      ciaoooo
    </Paper>
  );
};

export default StorageTab;
