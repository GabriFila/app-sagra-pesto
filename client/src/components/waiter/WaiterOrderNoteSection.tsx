import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

interface IWaiterOrderNoteSectionProps {
  note: string;
  serviceRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  orderId: string;
}

const useStyle = makeStyles(theme =>
  createStyles({
    noteSection: {
      display: 'flex',
      alignItems: 'center',
      width: '90%'
    },
    note: {
      padding: theme.spacing(1),
      maxWidth: 500,
      margin: 5,
      width: '100%'
    }
  })
);

const WaiterOrderNoteSection: React.FunctionComponent<IWaiterOrderNoteSectionProps> = props => {
  const classes = useStyle();
  const { serviceRef, note, orderId } = props;
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(note);

  const changeNoteInDB = () => {
    if (isEditingNote)
      if (note !== currentNote)
        serviceRef
          .collection('orders')
          .doc(orderId)
          .set({ note: currentNote }, { merge: true })
          .then(() => {
            setIsEditingNote(false);
          })
          .catch(err => {
            console.error(
              'ERROR IN EDITING ORDER NOTES',
              err.stack,
              err.message
            );
          });
      else setIsEditingNote(false);
  };

  return (
    <div className={classes.noteSection}>
      <ClickAwayListener onClickAway={changeNoteInDB}>
        <TextField
          multiline
          rows="2"
          placeholder={'Note ordine'}
          variant="standard"
          value={currentNote}
          className={classes.note}
          onFocus={() => {
            setIsEditingNote(true);
          }}
          onChange={e => {
            setCurrentNote(e.target.value);
          }}
        />
      </ClickAwayListener>
    </div>
  );
};

export default WaiterOrderNoteSection;
