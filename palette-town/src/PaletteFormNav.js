import React from 'react';
import { Link } from 'react-router-dom';
import useInputState from './hooks/useInputState';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
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
  navBtns: {},
}));

function PaletteFormNav(props) {
  const classes = useStyles();
  const { open, palettes, handleDrawerOpen, handleSubmit } = props;
  const [ newPaletteName, setNewPaletteName ] = useInputState('');

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  return (
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
          <Typography variant='h6' color='inherit' noWrap>
            Create New Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              name='paletteName'
              onChange={setNewPaletteName}
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
          <Link to='/'>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<ArrowBackIcon />}
            >
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;
