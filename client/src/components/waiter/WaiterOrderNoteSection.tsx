import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

interface IWaiterOrderNoteSectionProps {
  currentNote: string;
  note: string;
  isEditingNote: boolean;
  serviceRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  orderId: string;
  setIsEditingNote: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentNote: React.Dispatch<React.SetStateAction<string>>;
}

const useStyle = makeStyles(theme =>
  createStyles({
    noteSection: { display: 'flex', alignItems: 'center' },
    note: {
      padding: theme.spacing(1),
      width: '100%',
      maxWidth: 500,
      margin: 5
    }
  })
);

const WaiterOrderNoteSection: React.FunctionComponent<IWaiterOrderNoteSectionProps> = props => {
  const classes = useStyle();
  const {
    currentNote,
    isEditingNote,
    setIsEditingNote,
    setCurrentNote,
    serviceRef,
    note,
    orderId
  } = props;

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
