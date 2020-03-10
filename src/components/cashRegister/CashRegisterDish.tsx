import React, { useContext } from 'react';
import { IStorageDish } from '../../../types';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface ICashRegisterDishProps {
  dish: IStorageDish;
}

const useStyle = makeStyles(theme =>
  createStyles({
    paper: {
      flex: 1,
      padding: theme.spacing(1)
    },
    menu: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  })
);
const CashRegisterDish: React.FunctionComponent<ICashRegisterDishProps> = ({
  dish
}) => {
  const classes = useStyle();

  const { name, price, storageQt, shortName } = dish;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div
      style={{
        marginLeft: isMobile ? 5 : 20,
        display: 'flex',
        height: 40,
        alignItems: 'center'
      }}
    >
      <Typography variant="body1" style={{ flex: 6 }}>
        {isMobile ? shortName : name}
      </Typography>
      <Typography align="center" variant="body1" style={{ flex: 1 }}>
        {storageQt}
      </Typography>
      <RemoveIcon
        alignmentBaseline="text-after-edge"
        color="secondary"
        style={{ flex: 1 }}
      />
      <Typography align="center" variant="body1" style={{ flex: 1 }}>
        € {price}
      </Typography>
      <AddIcon
        alignmentBaseline="text-after-edge"
        color="primary"
        style={{ flex: 1 }}
      />{' '}
      <Typography align="center" variant="body1" style={{ flex: 1 }}>
        1
      </Typography>
    </div>
  );
};

export default CashRegisterDish;
