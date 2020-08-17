import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { IRoleRouteInfo } from '../clientTypes';

const useStyle = makeStyles(theme =>
  createStyles({
    drawer: {
      width: 100,
      flexShrink: 0
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    link: {
      color: theme.palette.text.primary
    },
    activeLink: {
      color: theme.palette.primary.main
    }
  })
);

interface IMenuProps {
  open: boolean;
  userRoles: IRoleRouteInfo[];
  closeDrawer: () => void;
}

const Menu: React.FunctionComponent<IMenuProps> = props => {
  const classes = useStyle();

  const { userRoles, open, closeDrawer } = props;

  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      open={open}
      ModalProps={{ onBackdropClick: closeDrawer }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {userRoles.map(role => (
          <NavLink
            key={role.title}
            to={`${role.path}`}
            className={classes.link}
            activeClassName={classes.activeLink}
            onClick={closeDrawer}
          >
            <ListItem button>
              <ListItemText primary={role.title} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;
