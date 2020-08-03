import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      margin: 'auto',
      alignSelf: 'center'
    },
    infoMsg: {
      margin: 'auto'
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

  const classes = useStyles();
  console.log(userRoles);
  return (
    <div className={classes.root}>
      {userRoles.length === 0 ? (
        <Typography variant="h4" className={classes.infoMsg}>
          Non hai ruoli, chiedi che te ne venga assegnato uno!
        </Typography>
      ) : null}
      {userRoles.map(role => (
        <Link key={role.name} to={`${role.route}`} className={classes.pageLink}>
          <Button
            color="primary"
            variant="contained"
            className={classes.pageLinkButton}
          >
            {role.name.replace('-', ' ')}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
