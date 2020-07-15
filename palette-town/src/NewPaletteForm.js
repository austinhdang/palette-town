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
  appBar: {
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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

  /* Picks a random color from existing palettes and adds it to new palette */
  const addRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    const filteredColors = allColors.filter((c) => !colors.includes(c));
    let rand = Math.floor(Math.random() * filteredColors.length);
    const randomColor = filteredColors[rand];
    setColors([ ...colors, randomColor ]);
  };

  const clearColors = () => {
    setColors([]);
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
          classes={classes}
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
          <Typography variant='h4'>Design Your Palette</Typography>
          <ColorPickerForm
            colors={colors}
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
          />
          <div>
            <Button
              variant='contained'
              color='primary'
              disabled={paletteIsFull}
              onClick={addRandomColor}
              startIcon={<ShuffleIcon />}
            >
              Random Color
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={clearColors}
              startIcon={<ClearIcon />}
            >
              Clear Palette
            </Button>
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
