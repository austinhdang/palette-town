import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker, Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import useInputState from './hooks/useInputState';

function PaletteMetaForm(props) {
  const { palettes, classes, handleSubmit, hideForm } = props;
  const [ stage, setStage ] = React.useState('form');
  const [ newPaletteName, setNewPaletteName ] = useInputState('');

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  const savePalette = (emoji) => {
    const newPalette = { paletteName: newPaletteName, emoji: emoji.native };
    handleSubmit(newPalette);
    setStage('');
  };

  return (
    <div>
      <Dialog
        open={stage === 'emoji'}
        onClose={hideForm}
        aria-labelledby='emoji-dialog-title'
      >
        <DialogTitle id='emoji-dialog-title'>
          <Emoji emoji='artist' size={24} skin={3} /> Choose a Palette Emoji
        </DialogTitle>
        <Picker
          title='Pick a Palette Emoji'
          onSelect={savePalette}
          emoji='art'
        />
      </Dialog>
      <Dialog
        open={stage === 'form'}
        onClose={hideForm}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          <Emoji emoji='art' size={24} /> Choose a Palette Name
        </DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your beautiful new palette. Make sure it's
              unique!
            </DialogContentText>
            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              name='paletteName'
              fullWidth
              margin='normal'
              onChange={setNewPaletteName}
              validators={[ 'required', 'isPaletteNameUnique' ]}
              errorMessages={[
                'Enter a palette name',
                'Palette name already used',
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color='default'>
              Cancel
            </Button>
            <Button
              variant='contained'
              className={classes.saveButton}
              type='submit'
            >
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
