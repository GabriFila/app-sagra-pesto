import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import withStorageContext from '../../context/StorageContext';
import CashRegisterMenu from '../cashRegister/CashRegisterMenu';
import withCashRegisterContext from '../../context/CashRegisterContext';
import InstantCashRegisterConsole from './InstantCashRegisterConsole';
import CashRegisterNav from '../cashRegister/CashRegisterNav';
import withServiceActive from '../ShowWhenServiceIsActive';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cashRegisterPage: {
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
    },
    errorMsg: {
      margin: theme.spacing(8, 0)
    }
  })
);

const InstantCashRegisterPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.cashRegisterPage}>
      <CashRegisterNav onlyInstant={true} />
      <CashRegisterMenu onlyInstant={true} />
      <InstantCashRegisterConsole />
    </Container>
  );
};

export default withServiceActive(
  withStorageContext(withCashRegisterContext(InstantCashRegisterPage))
);
