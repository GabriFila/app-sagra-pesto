import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface IWaiterDishProps {
  shortName: string;
  qt: number;
}

const useStyle = makeStyles(theme =>
  createStyles({
    dish: {
      margin: theme.spacing(2, 3),
      display: 'flex',
      justifyContent: 'space-between'
    }
  })
);

const WaiterDish: React.FunctionComponent<IWaiterDishProps> = props => {
  const classes = useStyle();
  const { shortName, qt } = props;

  return (
    <div className={classes.dish}>
      <Typography variant="h6" color="textPrimary">
        {shortName}
      </Typography>
      <Typography variant="h6" color="primary">
        {qt}
      </Typography>
    </div>
  );
};

export default React.memo(WaiterDish);
