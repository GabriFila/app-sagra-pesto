import React from 'react';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CashRegisterMenu from './CashRegisterMenu';
import withCashRegisterContext from '../../context/CashRegisterContext';
import CashRegisterConsole from './CashRegisterConsole';
import CashRegisterNav from './CashRegisterNav';
import withServiceActive from '../ShowWhenServiceIsActive';

const useStyle = makeStyles(theme =>
  createStyles({
    cashRegisterPage: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around',
      padding: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
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
  const classes = useStyle();
  return (
    <Container className={classes.cashRegisterPage}>
      <CashRegisterNav onlyInstant={false} />
      <CashRegisterMenu onlyInstant={false} whichCourse={undefined} />
      <CashRegisterConsole />
    </Container>
  );
};

export default withServiceActive(withCashRegisterContext(CashRegisterPage));
