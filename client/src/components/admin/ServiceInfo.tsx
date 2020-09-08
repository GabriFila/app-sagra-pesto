import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import { unix } from 'moment';

interface IServiceInfoProps {
  totalOrders: number;
  totalRevenue: number;
  totalInstantOrders: number;
  totalInstantRevenue: number;
  totalPeople: number;
  start: firebase.firestore.Timestamp;
}

const useStyle = makeStyles(theme => ({
  serviceInfoTable: {
    margin: 'auto',
    maxWidth: 200,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none'
    }
  },
  serviceDate: {
    padding: theme.spacing(2)
  }
}));

const ServiceInfo: React.FunctionComponent<IServiceInfoProps> = props => {
  const {
    totalOrders,
    totalRevenue,
    totalInstantOrders,
    totalInstantRevenue,
    totalPeople,
    start: startSeconds
  } = props;
  const classes = useStyle();

  return (
    <>
      <Paper elevation={6}>
        <Typography
          className={classes.serviceDate}
          align="center"
          color="primary"
        >
          Inizio: &nbsp;&nbsp;&nbsp;
          {unix(startSeconds.seconds).format('MM:HH --- DD/MM/YYYY')}
        </Typography>
        <Table aria-label="simple table" className={classes.serviceInfoTable}>
          <TableHead>
            <TableRow>
              <TableCell>Dati</TableCell>
              <TableCell align="right">Corrente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Ordini
              </TableCell>
              <TableCell align="right">{totalOrders}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Incasso ordini
              </TableCell>
              <TableCell align="right">€{totalRevenue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Ordini Bar
              </TableCell>
              <TableCell align="right">{totalInstantOrders}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Incasso Ordini Bar
              </TableCell>
              <TableCell align="right">€{totalInstantRevenue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Coperti
              </TableCell>
              <TableCell align="right">{totalPeople}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default ServiceInfo;
