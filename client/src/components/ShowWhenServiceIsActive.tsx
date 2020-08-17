import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { ServiceContext } from '../context/ServiceContext';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(theme =>
  createStyles({
    errorMsg: {
      margin: theme.spacing(8, 0)
    }
  })
);

const ShowWhenServiceIsActive: React.FunctionComponent = ({ children }) => {
  const classes = useStyle();
  const { isServiceActive } = useContext(ServiceContext);
  return (
    <>
      {isServiceActive === true ? (
        <> {children}</>
      ) : isServiceActive === false ? (
        <Typography
          variant="h3"
          align="center"
          color="error"
          className={classes.errorMsg}
        >
          Il servizio non è attivo al momento
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
};

const withServiceActive = (BaseComponent: React.FunctionComponent) => (
  props: any
) => (
  <ShowWhenServiceIsActive>
    <BaseComponent {...props} />
  </ShowWhenServiceIsActive>
);

export default withServiceActive;
