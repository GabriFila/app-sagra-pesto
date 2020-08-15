import React, { useState, useContext, useEffect } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { IDBCourse } from '../../../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import withServiceActive from '../ShowWhenServiceIsActive';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import ViewSelector from '../ViewSelector';
import { useMediaQuery, useTheme } from '@material-ui/core';
import ResponsiveGrid from '../ResponsiveGrid';

const useStyle = makeStyles(theme =>
  createStyles({
    kitchenPage: {
      flex: 1,
      padding: theme.spacing(2),
      display: 'flex'
    }
  })
);

function HubPage() {
  const classes = useStyle();
  const { serviceRef } = useContext(ServiceContext);
  const [courses, setCourses] = useState<IDBCourse[]>([]);
  const lowcaseCourse = useLocation().pathname.replace('/cucina/', '');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [viewSelected, setViewSelected] = useState(0);
  const course = `${lowcaseCourse
    .charAt(0)
    .toUpperCase()}${lowcaseCourse.substr(1)}`;
  useEffect(() => {
    let unsubscribe: () => void;
    unsubscribe = serviceRef
      .collection('courses')
      .where('status', '==', 'prep')
      .where('courseName', '==', course)
      .onSnapshot(
        snap => {
          setCourses(oldCourses => {
            const newCourses = [...oldCourses];
            snap
              .docChanges()
              .filter(change => change.type === 'added')
              .forEach(change => {
                const newCourse = change.doc.data() as IDBCourse;
                newCourses.push({ ...newCourse, courseId: change.doc.id });
              });
            return newCourses;
          });
        },
        err =>
          console.error(
            "ERROR IN GETTING WAITER'S ORDERS",
            err.message,
            err.stack
          )
      );
    return () => {
      unsubscribe();
    };
  }, [serviceRef, course]);
  return (
    <>
      <Container maxWidth={false} className={classes.kitchenPage}>
        {/* {(!isMobile || viewSelected === 0) && (
          <ResponsiveGrid
            elementList={courses
              .sort((a, b) => a.orderNum - b.orderNum)
              .map(({ dishes, orderNum, courseId, note }) => (
                <KitchenCourse
                  key={courseId}
                  dishes={dishes}
                  orderNum={orderNum}
                  courseId={courseId}
                  note={note}
                />
              ))}
          />
        )} */}
      </Container>
      {isMobile && (
        <ViewSelector
          viewSelected={viewSelected}
          setViewSelected={setViewSelected}
          data={['Primi', 'Secondi', 'Dolci'].map(comp => ({
            type: 'text',
            comp
          }))}
        />
      )}
    </>
  );
}

export default withServiceActive(HubPage);
