import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Typography from '@material-ui/core/Typography';

interface IWaiterDishProps {
  shortName: string;
  qt: number;
  color?:
    | 'inherit'
    | 'initial'
    | 'textPrimary'
    | 'primary'
    | 'secondary'
    | 'textSecondary'
    | 'error';
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

const GeneralDish: React.FunctionComponent<IWaiterDishProps> = props => {
  const classes = useStyle();
  const { shortName, qt, color } = props;

  return (
    <div className={classes.dish}>
      <Typography variant="h6" color="textPrimary">
        {shortName}
      </Typography>
      <Typography variant="h6" color={color || 'primary'}>
        {qt}
      </Typography>
    </div>
  );
};

export default React.memo(GeneralDish);
