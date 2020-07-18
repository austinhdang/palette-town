import React from 'react';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import useStyles from './styles/PaletteFormNavStyles';

function PaletteFormNav(props) {
  const classes = useStyles();
  const { open, palettes, handleDrawerOpen, handleSubmit } = props;
  const [ formShowing, setFormShowing ] = React.useState(false);

  const showForm = () => {
    setFormShowing(true);
  };

  const hideForm = () => {
    setFormShowing(false);
  };

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
            <EditIcon />
          </IconButton>
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Create New Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to='/'>
            <Button
              variant='outlined'
              color='default'
              startIcon={<ArrowBackIcon />}
              className={classes.backButton}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant='contained'
            onClick={showForm}
            startIcon={<DoneIcon />}
            className={classes.saveButton}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          classes={classes}
          handleSubmit={handleSubmit}
          hideForm={hideForm}
        />
      )}
    </div>
  );
}

export default PaletteFormNav;
