import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SafetyIconButton from '../SafetyButton';
import { CourseStatus } from '../../../../types';
import { ServiceContext } from '../../context/ServiceContext';

interface IWaiterCourseEditActionsProps {
  courseId: string;
}

const WaiterCourseEditActions: React.FunctionComponent<IWaiterCourseEditActionsProps> = props => {
  const { courseId } = props;
  const { serviceRef } = useContext(ServiceContext);
  const courseRef = serviceRef.collection('courses').doc(courseId);

  const deleteCourseInDB = () => {
    // declared here just for type compliances
    // TODO need to define enums
    const deletedStatus: CourseStatus = 'deleted';
    courseRef
      .set({ status: deletedStatus }, { merge: true })
      .then(res => {
        console.info('Deleted course');
      })
      .catch((err: Error) => {
        console.error('ERROR WHEN DELETING COURSE', err.message, err.stack);
      });
  };

  return (
    <>
      <SafetyIconButton
        onClick={deleteCourseInDB}
        description="Vuoi rimuovere la portata?"
      >
        <DeleteIcon color="secondary" />
      </SafetyIconButton>
    </>
  );
};

export default React.memo(WaiterCourseEditActions);
