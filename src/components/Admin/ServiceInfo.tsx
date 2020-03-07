import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IService } from '../../../types';

interface IServiceInfoProps {
  service: IService | undefined;
}

const ServiceInfo: React.FunctionComponent<IServiceInfoProps> = ({
  service
}) => {
  return (
    <Paper elevation={6}>
      <Table
        aria-label="simple table"
        style={{ maxWidth: 200, margin: 'auto' }}
      >
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
            <TableCell align="right">{service?.totalOrders}</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell component="th" scope="row">
              Incasso ordini
            </TableCell>
            <TableCell align="right">€{service?.totalRevenue}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Ordini Bar
            </TableCell>
            <TableCell align="right">{service?.totalInstantOrders}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Incasso Ordini Bar
            </TableCell>
            <TableCell align="right">€{service?.totalInstantRevenue}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Coperti
            </TableCell>
            <TableCell align="right">{service?.totalPeople}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ServiceInfo;
