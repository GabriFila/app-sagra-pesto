import React from 'react';
import Grid from '@material-ui/core/Grid';

interface IReponsiveGridProps {
  elementsList: JSX.Element[];
}

const ResponsiveGrid: React.FunctionComponent<IReponsiveGridProps> = props => {
  const { elementsList } = props;

  return (
    <Grid
      container
      spacing={2}
      // justify="center"
      alignContent="flex-start"
      wrap="wrap"
    >
      {elementsList.map(comp => (
        <Grid item key={comp.key} xs={12} sm={6} md={4} lg={3}>
          {comp}
        </Grid>
      ))}
    </Grid>
  );
};

export default ResponsiveGrid;
