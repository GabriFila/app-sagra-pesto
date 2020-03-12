import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import PrintIcon from '@material-ui/icons/Print';
import ReplayIcon from '@material-ui/icons/Replay';

interface ICashRegisterMenuProps {}
const consoleHeight = 300;
const useStyle = makeStyles(theme =>
  createStyles({
    console: {
      flexBasis: 70,
      height: consoleHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'sticky',
      top: `calc(50vh + 32px - ${consoleHeight / 2}px)`,
      [theme.breakpoints.down('sm')]: {
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
  return (
    <Paper elevation={6} className={classes.console}>
      <Typography variant="h6" color="secondary">
        €25
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
      <IconButton className={classes.doneBtn} color="primary">
        <PrintIcon />
      </IconButton>
      <IconButton className={classes.doneBtn} color="secondary">
        <ReplayIcon />
      </IconButton>
    </Paper>
  );
};

export default CashRegisterConsole;
