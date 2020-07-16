import React from 'react';
import useInputState from './hooks/useInputState';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import AddIcon from '@material-ui/icons/Add';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import chroma from 'chroma-js';
import { ChromePicker } from 'react-color';

const useStyles = makeStyles({
  colorPicker: {
    marginTop: '1.5rem',
  },
  colorButtons: {
    display: 'flex',
    flexDirection: 'row',
    '& Button': {
      width: '50%',
      fontSize: '1rem',
      lineHeight: '1.1rem',
      '& .MuiSvgIcon-root': {
        fontSize: '1.5rem',
      },
    },
  },
  randomColor: {
    marginRight: '0.5rem',
    padding: '6px 25px 6px 20px',
    backgroundColor: '#1ca9ef',
  },
  addColor: {
    marginLeft: '0.5rem',
    padding: '6px 12px 6px 8px',
    '& .MuiButton-startIcon': {
      marginRight: '0.375rem',
    },
  },
  colorNameInput: {
    width: '100%',
    height: '64px',
  },
});

function ColorPickerForm(props) {
  const classes = useStyles();
  const { colors, setColors, palettes, paletteIsFull, addNewColor } = props;
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

  /* Picks a random color from existing palettes and adds it to the palette */
  const addRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    const filteredColors = allColors.filter((c) => !colors.includes(c));
    let rand = Math.floor(Math.random() * filteredColors.length);
    const randomColor = filteredColors[rand];
    setColors([ ...colors, randomColor ]);
  };

  return (
    <div>
      <ChromePicker
        color={currColor}
        width='100%'
        onChangeComplete={updateCurrentColor}
        className={classes.colorPicker}
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          label='Color Name'
          value={newColorName}
          variant='filled'
          margin='normal'
          className={classes.colorNameInput}
          onChange={setNewColorName}
          validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
          errorMessages={[
            'Enter a color name',
            'Color name already used',
            'Color already used',
          ]}
        />
        <div className={classes.colorButtons}>
          <Button
            variant='contained'
            color='primary'
            disabled={paletteIsFull}
            onClick={addRandomColor}
            startIcon={<ShuffleIcon />}
            className={classes.randomColor}
          >
            Random Color
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled={paletteIsFull}
            startIcon={<AddIcon />}
            className={classes.addColor}
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
        </div>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
