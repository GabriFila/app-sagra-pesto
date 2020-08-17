import React, { Dispatch, SetStateAction } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ToLightIcon from '@material-ui/icons/BrightnessHigh';
import ToDarkIcon from '@material-ui/icons/Brightness4';

interface IThemeToggleProps {
  isLightTheme: boolean;
  setIsLigthTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeToggle: React.FunctionComponent<IThemeToggleProps> = props => {
  const { isLightTheme, setIsLigthTheme } = props;

  return (
    <IconButton
      onClick={() => {
        localStorage.setItem('isLastThemeLight', String(!isLightTheme));
        setIsLigthTheme(!isLightTheme);
      }}
    >
      {isLightTheme ? <ToDarkIcon /> : <ToLightIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
