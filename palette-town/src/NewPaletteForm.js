import React from 'react';
import clsx from 'clsx';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import arrayMove from 'array-move';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import PaletteFormDrawer from './PaletteFormDrawer';
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
  const { palettes } = props;
  const [ open, setOpen ] = React.useState(true);
  const [ colors, setColors ] = React.useState(palettes[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const removeColor = (colorName) => {
    const updatedColors = colors.filter((color) => color.name !== colorName);
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
        <PaletteFormDrawer
          open={open}
          setOpen={setOpen}
          colors={colors}
          setColors={setColors}
          palettes={palettes}
        />
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
