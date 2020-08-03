import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import StoreIcon from '@material-ui/icons/Store';
import DoneIcon from '@material-ui/icons/Done';
import ResetIcon from '@material-ui/icons/Replay';
import SafetyIconButton from '../SafetyButton';
import { CourseStatus } from '../../../../types';

interface IWaiterCourseActionsProps {
  status: CourseStatus;
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
  const { status } = props;

  return (
    <div className={classes.topRow}>
      {status === 'ready' && (
        <SafetyIconButton
          func={() => {
            alert('PORTATA SEGNATA COME COMPLETATA');
          }}
          action="Vuoi contrassegnare la portata come completata?"
        >
          <DoneIcon fontSize="large" color="secondary" />
        </SafetyIconButton>
      )}
      {(status === 'prep' || status === 'delivered') && (
        <SafetyIconButton
          func={() => {
            alert(`COMANDO ANNULLATO`);
          }}
          action="Vuoi annullare l'invio alla cucina"
        >
          <ResetIcon fontSize="large" color="secondary" />
        </SafetyIconButton>
      )}
      {status === 'wait' && (
        <SafetyIconButton
          func={() => {
            alert('MANDATO IN CUCINA');
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
