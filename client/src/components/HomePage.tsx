import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      margin: 'auto',
      alignSelf: 'center'
    },
    infoMsg: {
      margin: theme.spacing(2),
      fontSize: '1.3rem'
    },
    pageLink: {
      margin: 'auto',
      textDecoration: 'none'
    },
    pageLinkButton: { width: 150, height: 50 }
  })
);

const HomePage = () => {
  const { userRoles } = useContext(AuthContext);
  const classes = useStyle();
  return (
    <div className={classes.root}>
      {userRoles.length === 0 ? (
        <Typography
          variant="body1"
          className={classes.infoMsg}
          color="textPrimary"
        >
          Non hai ruoli, chiedi che te ne venga assegnato uno!
        </Typography>
      ) : null}
      {userRoles.map(role => (
        <Link key={role.title} to={`${role.path}`} className={classes.pageLink}>
          <Button
            color="primary"
            variant="contained"
            className={classes.pageLinkButton}
          >
            {role.title}
          </Button>
        </Link>
      ))}
      <Typography
        variant="body1"
        className={classes.infoMsg}
        align="center"
        color="textPrimary"
      >
        Se non vedi il tuo ruolo qui, prova ad uscire e riaccedere
      </Typography>
    </div>
  );
};

export default HomePage;
