import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      margin: 'auto',
      alignSelf: 'center'
    }
  })
);

const HomePage = () => {
  const { userRoles } = useContext(AuthContext);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {userRoles.length === 0 ? (
        <Typography variant="h4" style={{ margin: 'auto' }}>
          Non hai ruoli, chiedi che te ne venga assegnato uno!
        </Typography>
      ) : null}
      {userRoles.map(role => (
        <Link
          key={role}
          to={`/${role}`}
          style={{ margin: 'auto', textDecoration: 'none' }}
        >
          <Button
            color="primary"
            variant="contained"
            style={{ width: 150, height: 50 }}
          >
            {role}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
