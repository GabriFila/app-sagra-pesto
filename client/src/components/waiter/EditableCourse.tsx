import React from 'react';
import { IDish } from '../../../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Typography from '@material-ui/core/Typography';
import GeneralDish from '../GeneralDish';
import WaiterCourseActions from './WaiterCourseActions';

interface IEditableCourseProps {
  courseName: string;
  dishes: IDish[];
  courseId: string;
}

const useStyle = makeStyles(theme =>
  createStyles({
    course: {
      borderRadius: 6,
      padding: theme.spacing(2),
      width: '100%'
    },
    courseTopRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    ready: {
      animationName: '$blinker',
      animationDuration: '1.5s',
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

const EditableCourse: React.FunctionComponent<IEditableCourseProps> = props => {
  const classes = useStyle();
  const { courseName, dishes, courseId } = props;
  return (
    <div className={`${classes.course} `} style={{}}>
      <div className={`${classes.courseTopRow}`}>
        <Typography variant="h6" color="primary">
          {courseName}
        </Typography>
        <WaiterCourseActions courseId={courseId} isEditing={true} />
      </div>
      {dishes.map(({ shortName, qt }) => (
        <GeneralDish key={shortName} shortName={shortName} qt={qt} />
      ))}
    </div>
  );
};

export default React.memo(EditableCourse);
