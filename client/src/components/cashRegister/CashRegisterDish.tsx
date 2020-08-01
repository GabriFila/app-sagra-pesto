import React, { useContext } from 'react';
import { CashRegisterContext } from '../../context/CashRegisterContext';
import { ActionType } from '../../reducers/CashRegisterReducer';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';

interface ICashRegisterDishProps {
  name: string;
  price: number;
  storageQt: number;
  shortName: string;
  courseName: string;
  kitchen: string;
  orderQt: number;
}

const useStyle = makeStyles(() =>
  createStyles({
    base: {
      display: 'flex',
      height: 38,
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  })
);

const CashRegisterDish: React.FunctionComponent<ICashRegisterDishProps> = props => {
  const classes = useStyle();

  const {
    name,
    price,
    storageQt,
    shortName,
    courseName,
    orderQt,
    kitchen
  } = props;

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const { dispatch } = useContext(CashRegisterContext);

  return (
    <div className={classes.base}>
      <Typography variant="body1" style={{ flex: 7 }}>
        {isTablet ? shortName : name}
      </Typography>
      <Typography align="left" variant="body1" style={{ flex: 3 }}>
        € {price}
      </Typography>
      <Typography
        align="center"
        variant="body1"
        style={{ flex: 3, backgroundColor: storageQt < 30 ? '#db9486' : null }}
      >
        {storageQt}
      </Typography>
      <IconButton
        disabled={orderQt === 0}
        onClick={() =>
          dispatch({
            type: ActionType.RemoveDish,
            payload: { dishShortName: shortName, courseName }
          })
        }
        color="secondary"
      >
        <RemoveIcon style={{ flex: 1 }} />
      </IconButton>
      <Typography align="center" variant="body1" style={{ flex: 1 }}>
        {orderQt || 0}
      </Typography>
      <IconButton
        disabled={orderQt >= storageQt}
        onClick={() =>
          dispatch({
            type: ActionType.AddDish,
            payload: { dishShortName: shortName, price, courseName, kitchen }
          })
        }
        color="primary"
      >
        <AddIcon style={{ flex: 1 }} />
      </IconButton>
    </div>
  );
};

export default React.memo(
  CashRegisterDish,
  (prevProps, nextProps) => prevProps.orderQt == nextProps.orderQt
);
