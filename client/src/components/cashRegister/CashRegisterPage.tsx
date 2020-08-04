import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import withStorageContext from '../../context/StorageContext';
import CashRegisterMenu from './CashRegisterMenu';
import withCashRegisterContext from '../../context/CashRegisterContext';
import CashRegisterConsole from './CashRegisterConsole';
import CashRegisterNav from './CashRegisterNav';
import withServiceContext from '../../context/ServiceContext';
import withServiceActive from '../ShowWhenServiceIsActive';

const useStyles = makeStyles(theme =>
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

const CashRegisterPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.cashRegisterPage}>
      <CashRegisterNav onlyInstant={false} />
      <CashRegisterMenu onlyInstant={false} />
      <CashRegisterConsole />
    </Container>
  );
};

export default withServiceContext(
  withServiceActive(
    withStorageContext(withCashRegisterContext(CashRegisterPage))
  )
);
