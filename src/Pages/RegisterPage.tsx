import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkUI from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [psw, setPsw] = useState('');
  const [pswError, setPswError] = useState('');
  const [confirmPsw, setConfirmPsw] = useState('');
  const [confirmPswError, setConfirmPswError] = useState('');

  const registerUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEmailError('');
    setPswError('');
    setConfirmPswError('');

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      setEmailError('Email non valida');
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(psw))
      setPswError(
        'La password deve contenere almeno una lettera maiuscola, una minuscola e un numero'
      );
    if (psw !== confirmPsw) setConfirmPswError('L password non corrispondono');

    // register user
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
            autoFocus
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
            autoComplete="current-password"
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
          <Grid container>
            <Grid item>
              <Link to="/login">
                <LinkUI variant="body2">{'Hai già un account? Accedi!'}</LinkUI>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
