import React from 'react';
import Grid from '@material-ui/core/Grid';

interface IReponsiveGridProps {
  elementList: JSX.Element[];
}

const ResponsiveGrid: React.FunctionComponent<IReponsiveGridProps> = props => {
  const { elementList: list } = props;

  return (
    <Grid container spacing={2} justify="center" wrap="wrap">
      {list.map(comp => (
        <Grid item key={comp.key} xs={12} sm={5} md={3} lg={2}>
          {comp}
        </Grid>
      ))}
    </Grid>
  );
};

export default ResponsiveGrid;
