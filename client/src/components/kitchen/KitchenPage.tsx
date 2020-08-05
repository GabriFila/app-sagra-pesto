import React, { useState, useContext, useEffect } from 'react';
import withServiceContext, {
  ServiceContext
} from '../../context/ServiceContext';
import { AuthContext } from '../../context/AuthContext';
import { IDBCourse, IDBOrder } from '../../../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import withServiceActive from '../ShowWhenServiceIsActive';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import KitchenCourse from './KitchenCourse';
import Grid from '@material-ui/core/Grid';

const useStyle = makeStyles(theme =>
  createStyles({
    kitchenPage: {
      backgroundColor: 'lime',
      flexGrow: 1,
      width: '100%',
      padding: theme.spacing(2)
    }
  })
);

function KitchenPage() {
  const classes = useStyle();
  const { serviceRef } = useContext(ServiceContext);
  const { userId } = useContext(AuthContext);
  const [courses, setCourses] = useState<IDBCourse[]>([]);
  const lowcaseCourse = useLocation().pathname.replace('/cucina/', '');
  const course = `${lowcaseCourse
    .charAt(0)
    .toUpperCase()}${lowcaseCourse.substr(1)}`;
  console.log(course);
  useEffect(() => {
    let unsubscribe: () => void;

    if (serviceRef) {
      unsubscribe = serviceRef
        .collection('courses')
        .where('status', '==', 'prep')
        .where('courseName', '==', course)
        .onSnapshot(
          snap => {
            setCourses(
              snap.docs.map(doc => ({
                ...doc.data(),
                courseId: doc.id
              })) as IDBCourse[]
            );
          },
          err =>
            console.error(
              "ERROR IN GETTING WAITER'S ORDERS",
              err.message,
              err.stack
            )
        );
    }
    return () => {
      if (serviceRef) unsubscribe();
    };
  }, [serviceRef]);
  return (
    <div>
      <Grid container spacing={2} className={classes.kitchenPage}>
        {courses.map(({ dishes, orderNum, courseId, note }) => (
          <Grid item key={courseId} xs={12} md={6}>
            <KitchenCourse
              dishes={dishes}
              orderNum={orderNum}
              courseId={courseId}
              note={note}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default withServiceContext(withServiceActive(KitchenPage));
