import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import withStorageContext from '../../context/StorageContext';
import CashRegisterMenu from './CashRegisterMenu';
import withCashRegisterContext from '../../context/CashRegisterContext';
import CashRegisterConsole from './CashRegisterConsole';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around',
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
        padding: theme.spacing(1)
      }
    }
  })
);

const CashRegisterPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <CashRegisterMenu />
      <CashRegisterConsole />
    </Container>
  );
};

export default withStorageContext(withCashRegisterContext(CashRegisterPage));
// export default StorageContextProvider()(CashRegisterPage);
