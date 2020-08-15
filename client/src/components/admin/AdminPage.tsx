import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';
import StorageTab from './StorageTab';
import ServiceTab from './ServiceTab';
import withStorageContext from '../../context/StorageContext';
import ViewSelector from '../ViewSelector';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PollIcon from '@material-ui/icons/Poll';
import ReorderIcon from '@material-ui/icons/Reorder';

const useStyles = makeStyles((theme: Theme) =>
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
  const classes = useStyles();
  const [viewSelected, setViewSelected] = useState(0);
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  return (
    <Container className={classes.root}>
      {(!isMobile || viewSelected === 0) && <StorageTab />}
      {(!isMobile || viewSelected === 1) && <ServiceTab />}
      <ViewSelector
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        data={[<ReorderIcon />, <PollIcon />].map(comp => ({
          type: 'icon',
          comp
        }))}
      />
    </Container>
  );
};

export default withStorageContext(AdminPage);
