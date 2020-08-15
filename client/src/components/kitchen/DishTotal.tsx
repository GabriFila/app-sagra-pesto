import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GeneralDish from '../GeneralDish';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(theme =>
  createStyles({
    dishMap: {
      margin: theme.spacing(0, 3),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 'auto')
      },
      flexBasis: 300,
      padding: theme.spacing(0, 1)
    },
    title: {
      margin: theme.spacing(2, 0, 0, 0)
    }
  })
);

export interface IDishMap {
  [dish: string]: number;
}

interface IDishMapProps {
  dishMap: IDishMap;
}

const DishTotal: React.FunctionComponent<IDishMapProps> = props => {
  const classes = useStyle();
  const { dishMap } = props;
  return (
    <Paper className={classes.dishMap}>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        className={classes.title}
      >
        Totale
      </Typography>
      {Object.keys(dishMap).map(shortName =>
        dishMap[shortName] > 0 ? (
          <GeneralDish
            key={shortName}
            shortName={shortName}
            qt={dishMap[shortName]}
          ></GeneralDish>
        ) : (
          <></>
        )
      )}
    </Paper>
  );
};

export default DishTotal;
