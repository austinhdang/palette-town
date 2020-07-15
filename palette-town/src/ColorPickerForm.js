import React from 'react';
import useInputState from './hooks/useInputState';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import chroma from 'chroma-js';
import { ChromePicker } from 'react-color';

function ColorPickerForm(props) {
  const { colors, paletteIsFull, addNewColor } = props;
  const [ currColor, setColor ] = React.useState('#1BDE18');
  const [ newColorName, setNewColorName, resetNewColorName ] = useInputState(
    ''
  );

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule('isColorUnique', () => {
      return colors.every(({ color }) => color !== currColor);
    });
  });

  const updateCurrentColor = (newColor) => {
    setColor(newColor.hex);
  };

  const handleSubmit = () => {
    const newColor = {
      color: currColor,
      name: newColorName,
    };
    addNewColor(newColor);
    resetNewColorName();
  };

  return (
    <div>
      <ChromePicker color={currColor} onChangeComplete={updateCurrentColor} />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          label='Color Name'
          value={newColorName}
          name='colorName'
          onChange={setNewColorName}
          validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
          errorMessages={[
            'Enter a color name',
            'Color name already used',
            'Color already used',
          ]}
        />
        <Button
          variant='contained'
          type='submit'
          disabled={paletteIsFull}
          startIcon={<AddIcon />}
          style={
            paletteIsFull ? (
              {
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                color: 'rgba(0, 0, 0, 0.26)',
                boxShadow: 'none',
              }
            ) : (
              {
                backgroundColor: currColor,
                color:
                  chroma.contrast(currColor, 'white') < 4.5
                    ? 'rgba(0, 0, 0, 0.8)'
                    : 'white',
              }
            )
          }
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
