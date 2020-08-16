import React, { useState, useContext, useEffect } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { IDBCourse } from '../../../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import withServiceActive from '../ShowWhenServiceIsActive';
import { useLocation } from 'react-router-dom';
import KitchenCourse from './KitchenCourse';
import Container from '@material-ui/core/Container';
import DishTotal from './DishTotal';
import ViewSelector from '../ViewSelector';
import { useMediaQuery, useTheme, Divider } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReorderIcon from '@material-ui/icons/Reorder';
import ResponsiveGrid from '../ResponsiveGrid';

const useStyle = makeStyles(theme =>
  createStyles({
    kitchenPage: {
      flex: 1,
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'start'
    },
    divider: {
      width: 5,
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  })
);

function KitchenPage() {
  const classes = useStyle();
  const { serviceRef } = useContext(ServiceContext);
  const [courses, setCourses] = useState<IDBCourse[]>([]);
  const lowcaseKitchen = useLocation().pathname.replace('/cucina/', '');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [viewSelected, setViewSelected] = useState(0);
  const kitchen = `${lowcaseKitchen
    .charAt(0)
    .toUpperCase()}${lowcaseKitchen.substr(1)}`;

  useEffect(() => {
    let unsubscribe: () => void;
    unsubscribe = serviceRef
      .collection('courses')
      .where('status', '==', 'prep')
      .where('kitchen', '==', kitchen)
      .onSnapshot(
        snap => {
          setCourses(
            snap.docs.map(doc => ({
              ...(doc.data() as IDBCourse),
              courseId: doc.id
            }))
          );
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
  }, [serviceRef, kitchen]);

  return (
    <>
      <Container maxWidth={false} className={classes.kitchenPage}>
        {(!isMobile || viewSelected === 0) && (
          <ResponsiveGrid
            elementsList={courses
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
        )}
        <Divider orientation="vertical" className={classes.divider} />
        {(!isMobile || viewSelected === 1) && (
          <DishTotal
            dishMap={courses
              .map(course => course.dishes)
              .reduce((acc: any, dishes) => {
                dishes.forEach(dish => {
                  const dishQt = acc[dish.shortName];
                  if (dishQt)
                    acc[dish.shortName] = acc[dish.shortName] + dish.qt;
                  else acc[dish.shortName] = dish.qt;
                });
                return acc;
              }, {})}
          />
        )}
      </Container>
      {isMobile && (
        <ViewSelector
          viewSelected={viewSelected}
          setViewSelected={setViewSelected}
          data={[<DashboardIcon />, <ReorderIcon />].map(comp => ({
            type: 'icon',
            comp
          }))}
        />
      )}
    </>
  );
}

export default withServiceActive(KitchenPage);

// setCourses(oldCourses => {
//   const newCourses = [...oldCourses];
//   snap
//     .docChanges()
//     .filter(change => change.type === 'added')
//     .forEach(change => {
//       const newCourse = change.doc.data() as IDBCourse;
//       newCourses.push({ ...newCourse, courseId: change.doc.id });
//       newCourse.dishes.forEach(dish => {
//         const dishQt = oldDishMap[dish.shortName];
//         if (dishQt)
//           oldDishMap[dish.shortName] =
//             oldDishMap[dish.shortName] + dish.qt;
//         else oldDishMap[dish.shortName] = dish.qt;
//       });
//     });
//   return newCourses;
// });
// setCourses(
//   snap.docs.map(doc => ({
//     ...doc.data(),
//     courseId: doc.id
//   })) as IDBCourse[]
// );
