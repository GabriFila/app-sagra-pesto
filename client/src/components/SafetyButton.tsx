import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';

interface ISafetyDialogProps {
  action: string;
  func: () => void;
}

const SafetyIconButton: React.FunctionComponent<ISafetyDialogProps> = props => {
  const { action, func, children } = props;
  const [open, setOpen] = useState(false);

  const changeOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton onClick={changeOpen}>{children}</IconButton>
      <Dialog
        open={open}
        onClose={changeOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>{action}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeOpen} color="secondary">
            Annulla
          </Button>
          <Button
            onClick={() => {
              func();
              changeOpen();
            }}
            color="primary"
          >
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default SafetyIconButton;
