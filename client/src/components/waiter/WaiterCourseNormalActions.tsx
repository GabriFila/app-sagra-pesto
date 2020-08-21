import React, { useContext } from 'react';
import StoreIcon from '@material-ui/icons/Store';
import DoneIcon from '@material-ui/icons/Done';
import ResetIcon from '@material-ui/icons/Replay';
import SafetyIconButton from '../SafetyButton';
import { CourseStatus } from '../../../../types';
import { ServiceContext } from '../../context/ServiceContext';

interface IWaiterCourseNormalActionsProps {
  status: CourseStatus;
  courseId: string;
}

const WaiterCourseNormalActions: React.FunctionComponent<IWaiterCourseNormalActionsProps> = props => {
  const { status, courseId } = props;
  const { serviceRef } = useContext(ServiceContext);
  const courseRef = serviceRef.collection('courses').doc(courseId);
  const changeCourseStatus = (newStatus: CourseStatus) => {
    courseRef
      .set({ status: newStatus }, { merge: true })
      .catch((err: Error) => {
        console.error('ERROR WHEN UPDATING COURSE', err.message, err.stack);
      });
  };

  return (
    <>
      {status === 'ready' && (
        <SafetyIconButton
          onClick={() => {
            changeCourseStatus('delivered');
          }}
          description="Vuoi contrassegnare la portata come consegnata?"
        >
          <DoneIcon fontSize="large" color="secondary" />
        </SafetyIconButton>
      )}
      {(status === 'prep' || status === 'delivered') && (
        <SafetyIconButton
          onClick={() => {
            if (status === 'prep') changeCourseStatus('wait');
            if (status === 'delivered') changeCourseStatus('ready');
          }}
          description={
            status === 'prep'
              ? "Vuoi annullare l'invio alla cucina"
              : 'Vuoi annullare la consegna della portata?'
          }
        >
          <ResetIcon fontSize="large" color="secondary" />
        </SafetyIconButton>
      )}
      {status === 'wait' && (
        <SafetyIconButton
          onClick={() => {
            changeCourseStatus('prep');
          }}
          description="Vuoi inviare la portata alla cucina?"
        >
          <StoreIcon fontSize="large" color="secondary" />
        </SafetyIconButton>
      )}
    </>
  );
};

export default React.memo(WaiterCourseNormalActions);
