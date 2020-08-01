import React, { useContext } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';
import { StorageContext } from '../../context/StorageContext';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';

const consoleHeight = 400;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navs: {
      flexBasis: 90,
      height: consoleHeight,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      position: 'sticky',
      padding: theme.spacing(2),
      top: `calc(50vh + 32px - ${consoleHeight / 2}px)`,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row',
        top: 80,
        maxWidth: consoleHeight,
        width: '100%',
        padding: theme.spacing(1)
      }
    },
    link: {
      textDecoration: 'none',
      color: 'green'
    }
  })
);

const CashRegisterNav = () => {
  const classes = useStyles();
  const { storageCourses } = useContext(StorageContext);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  return isTablet ? null : (
    <div className={classes.navs}>
      {storageCourses.map(({ courseName }) => (
        <a key={courseName} href={`#${courseName}`} className={classes.link}>
          <Typography color="primary" variant="h5">
            {courseName}
          </Typography>
        </a>
      ))}
    </div>
  );
};

export default CashRegisterNav;
