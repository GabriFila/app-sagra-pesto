import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import { auth } from '../fbConfig';
import { AuthContext } from '../context/AuthContext';

const useStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function LoginPage() {
  const classes = useStyle();

  // form data
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [psw, setPsw] = useState('');

  // login error
  const [loginOutcome, setLoginOutcome] = useState('wait');

  const loginUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEmailError('');
    setLoginOutcome('wait');
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
      setEmailError('Email non valida');
    else {
      auth
        .signInWithEmailAndPassword(email, psw)
        .then(res => {
          setLoginOutcome('scess');
          // history.push('/admin');
        })
        .catch(err => {
          console.error(err.message);
          setLoginOutcome('error');
        });
    }
  };
  const { authPhase } = useContext(AuthContext);
  if (authPhase === 'in') return <Redirect to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Indirizzo email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
            error={emailError.length > 0}
            helperText={emailError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPsw(e.target.value)}
          />
          {loginOutcome === 'error' ? (
            <Typography color="error">
              Le credenziali non sono valide
            </Typography>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginUser}
          >
            Login
          </Button>
          <Link to="/register">
            <Button fullWidth variant="contained" color="secondary">
              Registrati
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
