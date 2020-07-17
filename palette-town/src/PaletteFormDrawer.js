import React from 'react';
import ColorPickerForm from './ColorPickerForm';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ClearIcon from '@material-ui/icons/Clear';
import useStyles from './styles/PaletteFormDrawerStyles';

function PaletteFormDrawer(props) {
  const classes = useStyles();
  const { maxColors = 20, open, setOpen, colors, setColors, palettes } = props;
  const paletteIsFull = colors.length >= maxColors;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([ ...colors, newColor ]);
  };

  /* Generates a new palette with random colors from existing palettes and 
     replaces current palette */
  const generateRandomPalette = () => {
    const updatedColors = [];
    const allColors = palettes.map((p) => p.colors).flat();
    for (let i = 0; i < maxColors; i++) {
      let filteredColors = allColors.filter((c) => !updatedColors.includes(c));
      let rand = Math.floor(Math.random() * filteredColors.length);
      const randomColor = filteredColors[rand];
      updatedColors.push(randomColor);
    }
    setColors(updatedColors);
  };

  const clearColors = () => {
    setColors([]);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant='h5' noWrap>
          Palette Town
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ExitToAppIcon style={{ color: 'black' }} />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.drawerContainer}>
        <Typography variant='h4' gutterBottom>
          Design Your Palette
        </Typography>
        <div className={classes.paletteButtons}>
          <Button
            variant='contained'
            onClick={generateRandomPalette}
            startIcon={<ShuffleIcon />}
            className={classes.randomPalette}
          >
            Random Palette
          </Button>
          <Button
            variant='contained'
            onClick={clearColors}
            startIcon={<ClearIcon />}
            className={classes.clearPalette}
          >
            Clear Palette
          </Button>
        </div>
        <ColorPickerForm
          colors={colors}
          setColors={setColors}
          palettes={palettes}
          paletteIsFull={paletteIsFull}
          addNewColor={addNewColor}
        />
      </div>
    </Drawer>
  );
}

export default PaletteFormDrawer;
