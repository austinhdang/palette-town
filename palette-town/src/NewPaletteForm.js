import React from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ClearIcon from '@material-ui/icons/Clear';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import arrayMove from 'array-move';
import useStyles from './styles/NewPaletteFormStyles';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          lineHeight: 'unset',
        },
      },
    },
  },
});

function NewPaletteForm(props) {
  const classes = useStyles();
  const { maxColors = 20, palettes } = props;
  const [ open, setOpen ] = React.useState(false);
  const [ colors, setColors ] = React.useState(palettes[0].colors);
  const paletteIsFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([ ...colors, newColor ]);
  };

  const removeColor = (colorName) => {
    const updatedColors = colors.filter((color) => color.name !== colorName);
    setColors(updatedColors);
  };

  const clearColors = () => {
    setColors([]);
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

  const handleSubmit = (newPalette) => {
    const { paletteName } = newPalette;
    newPalette.id = paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push('/');
  };

  /* Sorts color boxes when using drag and drop */
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={handleSubmit}
          handleDrawerOpen={handleDrawerOpen}
        />
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
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={removeColor}
            axis='xy'
            onSortEnd={onSortEnd}
            distance={1}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default NewPaletteForm;
