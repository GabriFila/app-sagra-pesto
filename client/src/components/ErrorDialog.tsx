import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IErrorDialogProps {
  description: string;
  closeAction: () => void;
  open: boolean;
}

const ErrorDialog: React.FunctionComponent<IErrorDialogProps> = props => {
  const { description, closeAction, children, open } = props;

  return (
    <>
      <IconButton onClick={closeAction}>{children}</IconButton>
      <Dialog open={open} onClose={closeAction}>
        <DialogTitle>C'è stato un errore</DialogTitle>
        <DialogContent>
          <DialogContentText color="error">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAction} color="secondary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ErrorDialog;
