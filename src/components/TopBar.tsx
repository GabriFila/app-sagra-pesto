import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { auth } from '../fbConfig';
import { AuthContext } from '../AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);
const TopBar: React.FunctionComponent = () => {
  const classes = useStyles();

  const { phase, userRoles } = useContext(AuthContext);
  const logOutUser = () => {
    auth.signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sagra del Pesto
          </Typography>
          {phase === 'in' ? (
            <Button color="inherit" onClick={logOutUser}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
