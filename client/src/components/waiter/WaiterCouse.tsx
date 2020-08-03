import React from 'react';
import { IDish, CourseStatus } from '../../../../types';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WaiterDish from './WaiterDish';
import WaiterCourseActions from './WaiterCourseActions';
interface IWaiterCourseProps {
  courseName: string;
  dishes: IDish[];
  status: CourseStatus;
}

const useStyle = makeStyles(theme =>
  createStyles({
    course: {
      marginLeft: theme.spacing(1),
      borderRadius: 6,
      padding: theme.spacing(1)
    },
    topRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  })
);

const WaiterCourse: React.FunctionComponent<IWaiterCourseProps> = props => {
  const classes = useStyle();
  const theme = useTheme();
  const { courseName, dishes, status } = props;
  return (
    <div
      className={classes.course}
      style={
        status === 'ready'
          ? { backgroundColor: theme.palette.warning.light }
          : {}
      }
    >
      <div className={classes.topRow}>
        <Typography variant="h6" color="primary">
          {courseName}
        </Typography>
        <WaiterCourseActions status={status} />
      </div>
      {status !== 'delivered' &&
        dishes.map(({ shortName, qt }) => (
          <WaiterDish key={shortName} shortName={shortName} qt={qt} />
        ))}
    </div>
  );
};

export default React.memo(WaiterCourse);
