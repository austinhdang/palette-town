import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DoneIcon from '@material-ui/icons/Done';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function PaletteFormNav(props) {
  const { classes, open, palettes, handleDrawerOpen, handleSubmit } = props;
  const [ newName, setNewName ] = React.useState({
    colorName: '',
    paletteName: '',
  });

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleChange = (evt) => {
    setNewName({ ...newName, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
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
          <Typography variant='h5' className={open && classes.hide}>
            Palette Town
          </Typography>
          <ValidatorForm onSubmit={() => handleSubmit(newName.paletteName)}>
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
            <Link to='/'>
              <Button variant='contained' color='secondary'>
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;
