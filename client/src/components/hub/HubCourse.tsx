import React from 'react';
import Paper from '@material-ui/core/Paper';
import { IDish, CourseStatus } from '../../../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Typography from '@material-ui/core/Typography';
import GeneralDish from '../GeneralDish';

interface IHubCourse {
  orderNum: number;
  courseId: string;
  note: string;
  status: CourseStatus;
  dishes: IDish[];
}

const useStyle = makeStyles(theme =>
  createStyles({
    course: {
      width: '100%',
      padding: theme.spacing(1)
    },
    topRow: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: theme.spacing(1)
    },
    expandIcon: {
      transition: '0.2s ease-out'
    },
    note: {
      padding: theme.spacing(2)
    },
    ready: {
      animationName: '$blinker',
      animationDuration: '3s',
      animationTimingFunction: 'ease-out',
      animationIterationCount: 'infinite'
    },
    '@keyframes blinker': {
      '0%': { backgroundColor: theme.palette.background.paper },
      '50%': { backgroundColor: theme.palette.warning.light },
      '100%': { backgroundColor: theme.palette.background.paper }
    }
  })
);

const HubCourse: React.FunctionComponent<IHubCourse> = props => {
  const classes = useStyle();
  const { orderNum, note, dishes, status } = props;

  return (
    <Paper
      elevation={4}
      className={`${classes.course} ${status === 'ready' ? classes.ready : ''}`}
    >
      <div className={classes.topRow}>
        <Typography color="primary" variant="h5">
          O:{orderNum}
        </Typography>
      </div>
      {dishes.map(({ shortName, qt }) => (
        <GeneralDish key={shortName} shortName={shortName} qt={qt} />
      ))}
      {note !== '' && <Typography className={classes.note}>{note}</Typography>}
    </Paper>
  );
};

export default React.memo(HubCourse);
