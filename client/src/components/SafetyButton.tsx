import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';

interface ISafetyIconButtonProps {
  description: string;
  onClick: () => void;
}

const SafetyIconButton: React.FunctionComponent<ISafetyIconButtonProps> = props => {
  const { description, onClick, children } = props;
  const [open, setOpen] = useState(false);

  const changeOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton onClick={changeOpen}>{children}</IconButton>
      <Dialog open={open} onClose={changeOpen}>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeOpen} color="secondary">
            Annulla
          </Button>
          <Button
            onClick={() => {
              onClick();
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
