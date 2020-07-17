import React from 'react';
import useInputState from './hooks/useInputState';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

function PaletteMetaForm(props) {
  const { palettes, classes, handleSubmit, hideForm } = props;
  const [ open, setOpen ] = React.useState(true);
  const [ newPaletteName, setNewPaletteName ] = useInputState('');

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={hideForm} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your beautiful new palette. Make sure it's
            unique!
          </DialogContentText>
          <Picker />
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
  );
}

export default PaletteMetaForm;
