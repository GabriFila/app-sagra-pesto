import React, { useContext, Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../fbConfig';
import { useHistory } from 'react-router-dom';
import ToLightIcon from '@material-ui/icons/BrightnessHigh';
import ToDarkIcon from '@material-ui/icons/Brightness4';
import Menu from './Menu';
import PendingOrders from './hub/PendingOrders';
import { RoleName } from '../Routes';

interface IMenuProps {
  isLightTheme: boolean;
  setIsLigthTheme: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles(theme =>
  createStyles({
    topBar: {
      display: 'flex',
      minHeight: '100vh'
    },
    title: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    content: {
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      marginTop: 64,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    link: {
      color: theme.palette.text.primary
    },
    activeLink: {
      color: theme.palette.primary.main
    }
  })
);

const TopBar: React.FunctionComponent<IMenuProps> = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { children, isLightTheme, setIsLigthTheme } = props;

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const { phase, userRoles, userName: name } = useContext(AuthContext);

  const logOutUser = () => {
    auth.signOut();
  };
  const { location } = useHistory();
  return (
    <div className={classes.topBar}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {userRoles.length === 0 ? null : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={openDrawer}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap className={classes.title}>
            {name ? `${name}` : 'Sagra del Pesto'}
            {location.pathname.length > 0 &&
            location.pathname !== '/' &&
            userRoles.length > 0
              ? ` - ${
                  userRoles.find(role => role.path === location.pathname)?.title
                }`
              : ''}
          </Typography>
          {location.pathname.length > 0 &&
            userRoles.length > 0 &&
            location.pathname ===
              userRoles.find(userRole => userRole.requiredRole === RoleName.Hub)
                .path && <PendingOrders />}
          <IconButton
            onClick={() => {
              localStorage.setItem('isLastThemeLight', String(!isLightTheme));
              setIsLigthTheme(!isLightTheme);
            }}
          >
            {isLightTheme ? <ToDarkIcon /> : <ToLightIcon />}
          </IconButton>
          {phase === 'in' ? (
            <Button color="inherit" onClick={logOutUser}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Menu userRoles={userRoles} open={open} closeDrawer={closeDrawer} />
      <main className={clsx(classes.content)}>{children}</main>
    </div>
  );
};

export default TopBar;
