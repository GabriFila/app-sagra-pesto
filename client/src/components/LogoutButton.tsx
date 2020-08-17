import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import { auth } from '../fbConfig';

const LogoutButton: React.FunctionComponent = () => {
  const logOutUser = () => {
    auth.signOut();
  };
  return (
    <IconButton onClick={logOutUser}>
      <LogoutIcon fontSize="large" color="action" />
    </IconButton>
  );
};

export default LogoutButton;
