import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import SafetyIconButton from '../SafetyButton';
import { CourseStatus } from '../../../../types';
import { ServiceContext } from '../../context/ServiceContext';

interface IWaiterCourseEditActionsProps {
  courseId: string;
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

const WaiterCourseEditActions: React.FunctionComponent<IWaiterCourseEditActionsProps> = props => {
  const classes = useStyle();
  const { courseId } = props;
  const { serviceRef } = useContext(ServiceContext);
  const courseRef = serviceRef.collection('courses').doc(courseId);

  const deleteCourseInDB = () => {
    // declared here just for type compliances
    // TODO need to define enums
    const deletedStatus: CourseStatus = 'deleted';
    courseRef
      .set({ status: deletedStatus }, { merge: true })
      .catch((err: Error) => {
        console.error('ERROR WHEN DELETING COURSE', err.message, err.stack);
      });
  };

  return (
    <div className={classes.topRow}>
      <SafetyIconButton
        func={deleteCourseInDB}
        action="Vuoi rimuovere la portata?"
      >
        <DeleteIcon color="secondary" />
      </SafetyIconButton>
    </div>
  );
};

export default React.memo(WaiterCourseEditActions);
