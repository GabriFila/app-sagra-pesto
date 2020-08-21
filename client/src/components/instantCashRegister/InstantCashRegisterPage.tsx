import React from 'react';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CashRegisterMenu from '../cashRegister/CashRegisterMenu';
import withCashRegisterContext from '../../context/CashRegisterContext';
import InstantCashRegisterConsole from './InstantCashRegisterConsole';
import CashRegisterNav from '../cashRegister/CashRegisterNav';
import withServiceActive from '../ShowWhenServiceIsActive';

const useStyle = makeStyles(theme =>
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
  const classes = useStyle();
  return (
    <Container className={classes.cashRegisterPage}>
      <CashRegisterNav onlyInstant={true} />
      <CashRegisterMenu
        onlyInstant={true}
        whichCourse={undefined}
        isWaiter={false}
      />
      <InstantCashRegisterConsole />
    </Container>
  );
};

export default withServiceActive(
  withCashRegisterContext(InstantCashRegisterPage)
);
