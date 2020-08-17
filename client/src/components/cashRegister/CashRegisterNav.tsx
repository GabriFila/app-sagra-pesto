import React, { useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import { StorageContext } from '../../context/StorageContext';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface ICashRegisterNavProps {
  onlyInstant: boolean;
}

const navHeight = 400;
const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    navs: {
      flexBasis: 90,
      height: navHeight,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'sticky',
      padding: theme.spacing(2),
      top: `calc(50vh + 32px - ${navHeight / 2}px)`,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row',
        top: 80,
        maxWidth: navHeight,
        width: '100%',
        padding: theme.spacing(1)
      }
    },
    link: {
      padding: theme.spacing(3, 0)
    }
  })
);

const CashRegisterNav: React.FunctionComponent<ICashRegisterNavProps> = props => {
  const classes = useStyle();
  const { storageCourses } = useContext(StorageContext);
  const { onlyInstant } = props;

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  return isTablet ? null : (
    <div className={classes.navs}>
      {storageCourses
        .filter(({ isInstant }) => !onlyInstant || isInstant)
        .map(({ courseName }) => (
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
