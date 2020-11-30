import React, { useState, MouseEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { auth } from '../fbConfig';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

export default function RegisterPage() {
  const classes = useStyle();

  // form data state (field and field error)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [psw, setPsw] = useState('');
  const [pswError, setPswError] = useState('');
  const [confirmPsw, setConfirmPsw] = useState('');
  const [confirmPswError, setConfirmPswError] = useState('');
  const [showPsw, setShowPsw] = useState(false);
  // registration error
  const [regOutcome, setRegOutcome] = useState('wait');

  const registerUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO need to add spinner for user feedback on registration
    e.preventDefault();

    setRegOutcome('wait');

    setEmailError('');
    setPswError('');
    setConfirmPswError('');
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
      setEmailError('Email non valida');
    else if (
      psw.length < 8 ||
      !/[A-Z]/.test(psw) ||
      !/[a-z]/.test(psw) ||
      !/[0-9]/.test(psw)
    )
      setPswError(
        'La password deve contenere almeno 8 caratteri, di cui una lettera maiuscola, una minuscola e un numero'
      );
    else if (psw !== confirmPsw)
      setConfirmPswError('Le password non corrispondono');
    else {
      auth
        .createUserWithEmailAndPassword(email, psw)
        .then(() => {
          if (auth.currentUser != null)
            return auth.currentUser.updateProfile({ displayName: name });
        })
        .then(() => setRegOutcome('success'))
        .catch(err => {
          console.error(err.message);
          // handle registration error for better UX
          setRegOutcome('error');
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registrati
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome identificativo"
            helperText="Ad esempio il tuo soprannome"
            name="name"
            onChange={e => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Indirizzo email"
            name="email"
            autoComplete="email"
            onChange={e => {
              setEmail(e.target.value);
              if (emailError.length > 0) setEmailError('');
            }}
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
            type={showPsw ? 'text' : 'password'}
            autoComplete="off"
            id="password"
            onChange={e => {
              setPsw(e.target.value);
              if (pswError.length > 0) setPsw('');
            }}
            error={pswError.length > 0}
            helperText={pswError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPsw(!showPsw);
                    }}
                    onMouseDown={() => {
                      setShowPsw(!showPsw);
                    }}
                    edge="end"
                  >
                    {showPsw ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPsw"
            label="Conferma password"
            type={showPsw ? 'text' : 'password'}
            id="confirmPsw"
            autoComplete="off"
            onChange={e => {
              setConfirmPsw(e.target.value);
              if (confirmPswError.length > 0) setConfirmPswError('');
            }}
            error={confirmPswError.length > 0}
            helperText={confirmPswError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPsw(!showPsw);
                    }}
                    onMouseDown={() => {
                      setShowPsw(!showPsw);
                    }}
                    edge="end"
                  >
                    {showPsw ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {regOutcome === 'error' ? (
            <Typography color="error">
              C'è stato un problema con la registrazione
            </Typography>
          ) : regOutcome === 'success' ? (
            <Redirect to="/" />
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerUser}
            disabled={
              emailError.length !== 0 ||
              pswError.length !== 0 ||
              confirmPswError.length !== 0 ||
              name.length === 0 ||
              psw.length === 0 ||
              email.length === 0 ||
              confirmPsw.length === 0
            }
          >
            Registrati
          </Button>
          <Link to="/login">
            <Button fullWidth variant="contained" color="secondary">
              Accedi
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
