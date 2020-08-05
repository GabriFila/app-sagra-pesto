import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { IDBCourse, IDish } from '../../../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import WaiterCouse from '../waiter/WaiterCourse';
import GeneralDish from '../GeneralDish';
import { Grid } from '@material-ui/core';

interface IKitchenCourse {
  orderNum: number;
  courseId: string;
  note: string;
  dishes: IDish[];
}

const useStyle = makeStyles(theme =>
  createStyles({
    course: {
      width: '100%',
      padding: theme.spacing(1)
    },
    topRow: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: theme.spacing(1)
    },
    expandIcon: {
      transition: '0.2s ease-out'
    },
    note: {
      padding: theme.spacing(2)
    }
  })
);

const KitchenCourse: React.FunctionComponent<IKitchenCourse> = props => {
  const classes = useStyle();
  const { orderNum, note, dishes } = props;
  const [show, setShow] = useState(true);

  return (
    <Paper
      elevation={4}
      onClick={() => {
        if (!show) setShow(true);
      }}
      className={classes.course}
    >
      <div className={classes.topRow}>
        <Typography color="primary" variant="h5">
          O:{orderNum}
        </Typography>
        <IconButton
          size="medium"
          onClick={() => setShow(!show)}
          className={classes.expandIcon}
          style={!show ? { transform: 'rotateZ(180deg)' } : {}}
        >
          <ExpandIcon fontSize="large" color="secondary" />
        </IconButton>
      </div>
      {show &&
        dishes.map(({ shortName, qt }) => (
          <GeneralDish key={shortName} shortName={shortName} qt={qt} />
        ))}
      {note !== '' && <Typography className={classes.note}>{note}</Typography>}
    </Paper>
  );
};

export default React.memo(KitchenCourse);
