import React, { useContext, Dispatch, SetStateAction } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

import Menu from './Menu';
import PendingOrders from './hub/PendingOrders';
import { RoleName } from '../Routes';
import SearchOrder from './SearchOrder';
import ThemeToggle from './ThemeToggle';
import LogoutButton from './LogoutButton';
interface IMenuProps {
  isLightTheme: boolean;
  setIsLigthTheme: Dispatch<SetStateAction<boolean>>;
}

const useStyle = makeStyles(theme =>
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
    },
    logout: {
      color: theme.palette.background.paper
    }
  })
);

const TopBar: React.FunctionComponent<IMenuProps> = props => {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const { children, isLightTheme, setIsLigthTheme } = props;

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const { authPhase, userRoles, userName } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className={classes.topBar}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {userRoles.length === 0 ? null : (
            <IconButton
              color="inherit"
              onClick={openDrawer}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap className={classes.title}>
            {userName ? `${userName}` : 'Sagra del Pesto'}
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
                ?.path && <PendingOrders />}
          {location.pathname.length > 0 &&
            userRoles.length > 0 &&
            location.pathname ===
              userRoles.find(
                userRole =>
                  userRole.requiredRole === RoleName.Hub ||
                  userRole.requiredRole === RoleName.CashRegister
              )?.path && <SearchOrder />}
          <ThemeToggle
            isLightTheme={isLightTheme}
            setIsLigthTheme={setIsLigthTheme}
          />
          {authPhase === 'in' && <LogoutButton />}
        </Toolbar>
      </AppBar>
      <Menu userRoles={userRoles} open={open} closeDrawer={closeDrawer} />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default TopBar;
