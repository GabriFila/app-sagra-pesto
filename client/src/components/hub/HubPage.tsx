import React, { useState, useContext, useEffect, Fragment } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { IDBCourse } from '../../../../types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import withServiceActive from '../ShowWhenServiceIsActive';
import Container from '@material-ui/core/Container';
import ViewSelector from '../ViewSelector';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import HubCourse from './HubCourse';

const useStyle = makeStyles(theme =>
  createStyles({
    kitchenPage: {
      flex: 1,
      padding: theme.spacing(2),
      display: 'flex',
      overflowX: 'hidden'
    },
    divider: {
      width: 5,
      borderRadius: 10
    },
    kitchenColumn: {
      flex: 1
    },
    kitchenName: {
      padding: theme.spacing(1, 0, 2, 0)
    },
    coursesGrid: {
      overflowY: 'scroll',
      height: 'calc(100vh - 130px)',
      padding: '0px 2px',
      width: '100%'
    }
  })
);

function HubPage() {
  const classes = useStyle();
  const { serviceRef } = useContext(ServiceContext);
  const [courses, setCourses] = useState<IDBCourse[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [viewSelected, setViewSelected] = useState(0);

  const kitchens = ['Primi', 'Secondi', 'Bar'];

  useEffect(() => {
    let unsubscribe: () => void;
    unsubscribe = serviceRef
      .collection('courses')
      .where('status', 'in', ['prep', 'ready'])
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
  }, [serviceRef]);

  return (
    <>
      <Container maxWidth={false} className={classes.kitchenPage}>
        {kitchens.map(
          (kitchen, i) =>
            (!isMobile || viewSelected === i) && (
              <Fragment key={kitchen}>
                <div className={classes.kitchenColumn}>
                  <Typography
                    variant="h5"
                    color="primary"
                    align="center"
                    className={classes.kitchenName}
                  >
                    {kitchen}
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    justify="center"
                    alignContent="flex-start"
                    wrap="wrap"
                    className={classes.coursesGrid}
                  >
                    {courses
                      .filter(course => course.kitchen === kitchen)
                      .sort((a, b) => a.orderNum - b.orderNum)
                      .map(({ dishes, orderNum, courseId, note, status }) => (
                        <Grid item xs={9} sm={6} md={10} lg={5} key={courseId}>
                          <HubCourse
                            dishes={dishes}
                            orderNum={orderNum}
                            courseId={courseId}
                            note={note}
                            status={status}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </div>
                {!isMobile && i !== kitchens.length - 1 && (
                  <Divider orientation="vertical" className={classes.divider} />
                )}
              </Fragment>
            )
        )}
      </Container>
      {isMobile && (
        <ViewSelector
          viewSelected={viewSelected}
          setViewSelected={setViewSelected}
          data={kitchens.map(comp => ({
            type: 'text',
            comp
          }))}
        />
      )}
    </>
  );
}

export default withServiceActive(HubPage);
