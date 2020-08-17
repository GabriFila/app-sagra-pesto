import React, { Dispatch, SetStateAction } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface IViewData {
  type: 'icon' | 'text';
  comp: JSX.Element | string;
}

interface IViewSelectorProps {
  viewSelected: number;
  setViewSelected: Dispatch<SetStateAction<number>>;
  data: IViewData[];
}

const useStyle = makeStyles(theme => ({
  selector: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.primary.main
  },
  tab: {
    marginRight: 15,
    marginLeft: 15
  }
}));

const ViewSelector: React.FunctionComponent<IViewSelectorProps> = props => {
  const classes = useStyle();
  const {
    viewSelected: pageSelected,
    setViewSelected: setPageSelected,
    data
  } = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setPageSelected(newValue);
  };
  return (
    <div className={classes.selector}>
      <Tabs value={pageSelected} onChange={handleChange}>
        {data.map(({ type, comp }, i) =>
          type === 'icon' ? (
            <Tab key={i} icon={comp as JSX.Element} className={classes.tab} />
          ) : (
            <Tab key={i} className={classes.tab} label={comp as string} />
          )
        )}
      </Tabs>
    </div>
  );
};

export default ViewSelector;
