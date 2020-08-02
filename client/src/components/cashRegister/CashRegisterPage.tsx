import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import withStorageContext from '../../context/StorageContext';
import CashRegisterMenu from './CashRegisterMenu';
import withCashRegisterContext from '../../context/CashRegisterContext';
import CashRegisterConsole from './CashRegisterConsole';
import CashRegisterNav from './CashRegisterNav';
import withServiceContext, {
  ServiceContext
} from '../../context/ServiceContext';
import Typography from '@material-ui/core/Typography';

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

const CashRegisterPage = () => {
  const classes = useStyles();
  const { service } = useContext(ServiceContext);
  return (
    <Container className={classes.cashRegisterPage}>
      {service !== undefined ? (
        <>
          <CashRegisterNav />
          <CashRegisterMenu />
          <CashRegisterConsole />
        </>
      ) : (
        <Typography
          variant="h3"
          align="center"
          color="error"
          className={classes.errorMsg}
        >
          Il servizio non è attivo al momento
        </Typography>
      )}
    </Container>
  );
};

export default withServiceContext(
  withStorageContext(withCashRegisterContext(CashRegisterPage))
);
