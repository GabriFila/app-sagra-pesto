import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { CourseStatus } from '../../../../types';
import WaiterCourseEditActions from './WaiterCourseEditActions';
import WaiterCourseNormalActions from './WaiterCourseNormalActions';

interface IWaiterCourseActionsProps {
  status?: CourseStatus;
  courseId: string;
  isEditing: boolean;
}

const useStyle = makeStyles(theme =>
  createStyles({
    course: {
      marginLeft: theme.spacing(2)
    },
    topRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  })
);

const WaiterCourseActions: React.FunctionComponent<IWaiterCourseActionsProps> = props => {
  const classes = useStyle();
  const { status, courseId, isEditing } = props;

  return (
    <div className={classes.topRow}>
      {isEditing ? (
        <WaiterCourseEditActions courseId={courseId} />
      ) : (
        <WaiterCourseNormalActions courseId={courseId} status={status} />
      )}
    </div>
  );
};

export default React.memo(WaiterCourseActions);
