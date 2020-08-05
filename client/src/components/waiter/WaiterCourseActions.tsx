import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import StoreIcon from '@material-ui/icons/Store';
import DoneIcon from '@material-ui/icons/Done';
import ResetIcon from '@material-ui/icons/Replay';
import SafetyIconButton from '../SafetyButton';
import { CourseStatus } from '../../../../types';
import { ServiceContext } from '../../context/ServiceContext';

interface IWaiterCourseActionsProps {
  status: CourseStatus;
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

const WaiterCourseActions: React.FunctionComponent<IWaiterCourseActionsProps> = props => {
  const classes = useStyle();
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
    <div className={classes.topRow}>
      {status === 'ready' && (
        <SafetyIconButton
          func={() => {
            changeCourseStatus('delivered');
          }}
          action="Vuoi contrassegnare la portata come consegnata?"
        >
          <DoneIcon fontSize="large" color="secondary" />
        </SafetyIconButton>
      )}
      {(status === 'prep' || status === 'delivered') && (
        <SafetyIconButton
          func={() => {
            if (status === 'prep') changeCourseStatus('wait');
            if (status === 'delivered') changeCourseStatus('ready');
          }}
          action="Vuoi annullare l'invio alla cucina"
        >
          <ResetIcon fontSize="large" color="secondary" />
        </SafetyIconButton>
      )}
      {status === 'wait' && (
        <SafetyIconButton
          func={() => {
            changeCourseStatus('prep');
          }}
          action="Vuoi inviare la portata alla cucina?"
        >
          <StoreIcon fontSize="large" color="secondary" />
        </SafetyIconButton>
      )}
    </div>
  );
};

export default React.memo(WaiterCourseActions);
