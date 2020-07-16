import React from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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

const drawerWidth = 350;

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerContainer: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paletteButtons: {
    display: 'flex',
    flexDirection: 'row',
    // margin: '0.5rem auto',
    '& Button': {
      width: '50%',
      fontSize: '1rem',
      lineHeight: '1.1rem',
      '& .MuiSvgIcon-root': {
        fontSize: '1.5rem',
      },
    },
  },
  randomPalette: {
    marginRight: '0.5rem',
    padding: '6px 25px 6px 20px',
    backgroundColor: '#1ca9ef',
  },
  clearPalette: {
    marginLeft: '0.5rem',
    padding: '6px 22px 6px 20px',
    backgroundColor: '#EB030B',
  },
}));

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

  const handleSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors: colors,
    };
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
                color='primary'
                onClick={generateRandomPalette}
                startIcon={<ShuffleIcon />}
                className={classes.randomPalette}
              >
                Random Palette
              </Button>
              <Button
                variant='contained'
                color='secondary'
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
