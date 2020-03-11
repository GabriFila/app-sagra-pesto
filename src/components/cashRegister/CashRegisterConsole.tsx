import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { StorageContext } from '../../context/StorageContext';
import { Typography, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';

interface ICashRegisterMenuProps {}
const consoleHeight = 150;
const useStyle = makeStyles(theme =>
  createStyles({
    console: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      height: consoleHeight,
      alignItems: 'center',
      position: 'sticky',

      top: `calc(50vh + 32px - ${consoleHeight / 2}px)`,
      padding: 20
    }
  })
);
const CashRegisterConsole: React.FunctionComponent<ICashRegisterMenuProps> = () => {
  const classes = useStyle();
  return (
    <Paper elevation={6} className={classes.console}>
      <Typography>Totale: €25</Typography>
      <div style={{ display: 'flex' }}>
        <IconButton>
          <DoneIcon />
        </IconButton>
        <Typography
          variant="h5"
          style={{ border: '3px solid green', borderRadius: 10 }}
        >
          &nbsp; &nbsp; &nbsp; &nbsp;
        </Typography>
      </div>
    </Paper>
  );
};

export default CashRegisterConsole;
