import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    base: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
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
    <div className={classes.base}>
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
