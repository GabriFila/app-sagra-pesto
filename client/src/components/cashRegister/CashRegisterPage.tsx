import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CashRegisterMenu from './CashRegisterMenu';
import withCashRegisterContext, {
  CashRegisterContext
} from '../../context/CashRegisterContext';
import CashRegisterConsole from './CashRegisterConsole';
import CashRegisterNav from './CashRegisterNav';
import withServiceActive from '../ShowWhenServiceIsActive';
import ErrorDialog from '../ErrorDialog';
import { ActionType } from '../../reducers/CashRegisterReducer';

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
  const { state, dispatch } = useContext(CashRegisterContext);
  const { isError } = state;
  return (
    <Container className={classes.cashRegisterPage}>
      <CashRegisterNav onlyInstant={false} />
      <CashRegisterMenu
        onlyInstant={false}
        whichCourse={undefined}
        isWaiter={false}
      />
      <CashRegisterConsole />
      <ErrorDialog
        open={isError}
        description="C'è stato un errore nel creare l'ordine"
        closeAction={() => {
          dispatch({ type: ActionType.ResetState });
        }}
      />
    </Container>
  );
};

export default withServiceActive(withCashRegisterContext(CashRegisterPage));
