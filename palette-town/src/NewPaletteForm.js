import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import DraggableColorBox from './DraggableColorBox';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

const drawerWidth = 400;

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
    justifyContent: 'flex-end',
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
  const [ open, setOpen ] = React.useState(false);
  const [ currColor, setColor ] = React.useState('teal');
  const [ colors, setColors ] = React.useState([
    { color: '#1ba619', name: 'Green' },
  ]);
  const [ newName, setNewName ] = React.useState({
    colorName: '',
    paletteName: '',
  });

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule('isColorUnique', () => {
      return colors.every(({ color }) => color !== currColor);
    });
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = {
      color: currColor,
      name: newName.colorName,
    };
    setColors([ ...colors, newColor ]);
    setNewName({ ...newName, colorName: '' });
  };

  const handleChange = (evt) => {
    setNewName({ ...newName, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = () => {
    let newPaletteName = newName.paletteName;
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors: colors,
    };
    props.savePalette(newPalette);
    props.history.push('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          color='default'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              Create New Palette
            </Typography>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                label='Palette Name'
                value={newName.paletteName}
                name='paletteName'
                onChange={handleChange}
                validators={[ 'required', 'isPaletteNameUnique' ]}
                errorMessages={[
                  'Enter a palette name',
                  'Palette name already used',
                ]}
              />
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                startIcon={<DoneIcon />}
                type='submit'
              >
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
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
            <IconButton onClick={handleDrawerClose}>
              <ExitToAppIcon style={{ color: 'black' }} />
            </IconButton>
          </div>
          <Divider />
          <Typography variant='h4'>Design Your Palette</Typography>
          <ChromePicker
            color={currColor}
            onChangeComplete={updateCurrentColor}
          />
          <ValidatorForm onSubmit={addNewColor}>
            <TextValidator
              label='Color Name'
              value={newName.colorName}
              name='colorName'
              onChange={handleChange}
              validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
              errorMessages={[
                'Enter a color name',
                'Color name already used',
                'Color already used',
              ]}
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              style={{ backgroundColor: currColor }}
              startIcon={<AddIcon />}
            >
              Add Color
            </Button>
          </ValidatorForm>
          <div>
            <Button
              variant='contained'
              color='primary'
              startIcon={<ShuffleIcon />}
            >
              Random Color
            </Button>
            <Button
              variant='contained'
              color='secondary'
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
          {colors.map((color) => (
            <DraggableColorBox color={color.color} name={color.name} />
          ))}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default NewPaletteForm;
