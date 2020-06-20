import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import withStorageContext from '../../context/StorageContext';
import CashRegisterMenu from './CashRegisterMenu';
import withCashRegisterContext from '../../context/CashRegisterContext';
import CashRegisterConsole from './CashRegisterConsole';
import CashRegisterNav from './CashRegisterNav';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cashPage: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around',
      padding: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        // height: 'auto',
        flexDirection: 'column-reverse',
        padding: theme.spacing(1),
        alignItems: 'center'
      }
    }
  })
);

const CashRegisterPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.cashPage}>
      <CashRegisterNav />
      <CashRegisterMenu />
      <CashRegisterConsole />
    </Container>
  );
};

export default withStorageContext(withCashRegisterContext(CashRegisterPage));