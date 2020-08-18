import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import StorageTab from './StorageTab';
import ServiceTab from './ServiceTab';
import ViewSelector from '../ViewSelector';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PollIcon from '@material-ui/icons/Poll';
import ReorderIcon from '@material-ui/icons/Reorder';

const useStyle = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      height: 'calc(100vh - 80px)',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
        flexDirection: 'column',
        padding: theme.spacing(1)
      }
    }
  })
);

const AdminPage = () => {
  const classes = useStyle();
  const [viewSelected, setViewSelected] = useState(0);
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  return (
    <Container className={classes.root}>
      {(!isMobile || viewSelected === 1) && <StorageTab />}
      {(!isMobile || viewSelected === 0) && <ServiceTab />}
      {isMobile && (
        <ViewSelector
          viewSelected={viewSelected}
          setViewSelected={setViewSelected}
          data={[<PollIcon />, <ReorderIcon />].map(comp => ({
            type: 'icon',
            comp
          }))}
        />
      )}
    </Container>
  );
};

export default AdminPage;
