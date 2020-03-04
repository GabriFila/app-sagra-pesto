import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../fbConfig';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
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
  const classes = useStyles();

  // form data state (field and field error)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [psw, setPsw] = useState('');
  const [pswError, setPswError] = useState('');
  const [confirmPsw, setConfirmPsw] = useState('');
  const [confirmPswError, setConfirmPswError] = useState('');

  // registration error
  const [regOutcome, setRegOutcome] = useState('wait');

  const registerUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setRegOutcome('wait');

    setEmailError('');
    setPswError('');
    setConfirmPswError('');
    // FIXME password regex
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
      setEmailError('Email non valida');
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(psw))
      setPswError(
        'La password deve contenere almeno una lettera maiuscola, una minuscola e un numero'
      );
    else if (psw !== confirmPsw)
      setConfirmPswError('L password non corrispondono');
    else {
      auth
        .createUserWithEmailAndPassword(email, psw)
        .then(res => {
          console.log(res);
          if (auth.currentUser != null)
            return auth.currentUser.updateProfile({ displayName: name });
        })
        .then(res => setRegOutcome('success'))
        .catch(err => {
          console.error(err.message);
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
            onChange={e => setPsw(e.target.value)}
            error={pswError.length > 0}
            helperText={pswError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPsw"
            label="Conferma password"
            type="password"
            id="confirmPsw"
            onChange={e => setConfirmPsw(e.target.value)}
            error={confirmPswError.length > 0}
            helperText={confirmPswError}
          />
          {regOutcome === 'error' ? (
            <Typography color="error">
              C'è stato un problema con la registrazione
            </Typography>
          ) : regOutcome === 'success' ? (
            <Typography color="primary">
              La registrazione è andata a buon fine! Chiedi che ti venga
              assegnato un ruolo
            </Typography>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerUser}
          >
            Registrati
          </Button>
          <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
            <Button fullWidth variant="contained" color="secondary">
              Accedi
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
