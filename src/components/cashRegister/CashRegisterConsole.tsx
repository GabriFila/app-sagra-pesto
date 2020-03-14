import React, { useContext, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import PrintIcon from '@material-ui/icons/Print';
import ReplayIcon from '@material-ui/icons/Replay';
import { StorageContext } from '../../context/StorageContext';
import { CashRegisterContext } from '../../context/CashRegisterContext';

import jsPDF from 'jspdf';

interface ICashRegisterMenuProps {}
const consoleHeight = 300;
const useStyle = makeStyles(theme =>
  createStyles({
    console: {
      flexBasis: 90,
      height: consoleHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'sticky',
      top: `calc(50vh + 32px - ${consoleHeight / 2}px)`,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row',
        top: 80,
        maxWidth: consoleHeight,
        width: '100%',
        padding: theme.spacing(1)
      }
    },
    doneBtn: {
      borderRadius: '50%'
    }
  })
);
const CashRegisterConsole: React.FunctionComponent<ICashRegisterMenuProps> = () => {
  const classes = useStyle();

  const { storageCourses } = useContext(StorageContext);
  const { state } = useContext(CashRegisterContext);

  const { dishes } = state;
  let total = 0;

  dishes.forEach(dishInOrder => {
    const { price } = storageCourses
      .find(course =>
        course.dishes.some(dish => dish.shortName === dishInOrder.shortName)
      )
      .dishes.find(dish => dish.shortName === dishInOrder.shortName);
    total += price * dishInOrder.qt;
  });

  const printOrder = () => {
    const doc = new jsPDF();
    doc.text(10, 10, 'Sagra del pesto');
    doc.text(10, 20, 'This is a test');
    doc.line(0, 23, 210, 23);
    doc.line(10, 0, 10, 297);
    doc.table(10, 50, ['ciao', 'come'], [], {});
    doc.autoPrint();
    // TODO create table
    // doc.save('autoprint.pdf');
    doc.output('dataurlnewwindow');
  };

  return (
    <Paper elevation={6} className={classes.console}>
      <Typography variant="h6" color="secondary">
        € {total}
      </Typography>
      <IconButton className={classes.doneBtn} color="primary">
        <DoneIcon />
      </IconButton>
      <Typography
        variant="h5"
        style={{ border: '3px solid green', borderRadius: 10 }}
      >
        &nbsp; &nbsp; &nbsp; &nbsp;
      </Typography>
      <IconButton
        className={classes.doneBtn}
        color="primary"
        onClick={printOrder}
      >
        <PrintIcon />
      </IconButton>
      <IconButton className={classes.doneBtn} color="secondary">
        <ReplayIcon />
      </IconButton>
    </Paper>
  );
};

export default CashRegisterConsole;
