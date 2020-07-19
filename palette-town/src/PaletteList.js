import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles/PaletteListStyles';

function PaletteList(props) {
  const { history, palettes, classes, deletePalette } = props;
  const [ open, setOpen ] = React.useState(false);
  const [ selectedPalette, setSelectedPalette ] = React.useState({
    id: '',
    name: '',
  });

  const goToPalette = (id) => {
    history.push(`/palette/${id}`);
  };

  const openDialog = (id, name) => {
    setOpen(true);
    setSelectedPalette({ id, name });
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedPalette({ id: '', name: '' });
  };

  const handleDelete = () => {
    deletePalette(selectedPalette.id);
    closeDialog();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>Palette Town</h1>
          <Link to='/palette/new' className={classes.link}>
            New Palette <AddIcon />
          </Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
              <MiniPalette
                {...palette}
                handleClick={() => goToPalette(palette.id)}
                openDialog={openDialog}
                key={palette.id}
                id={palette.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={open}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'
      >
        <DialogTitle id='delete-dialog-title'>Delete this palette?</DialogTitle>
        <DialogContent>
          <DialogContentText
            className={classes.dialogText}
            id='delete-dialog-description'
          >
            <strong>{selectedPalette.name}</strong> will be removed from the
            palette list. All generated colors related to this palette will be{' '}
            <span className={classes.emphasis}>permanently deleted</span>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='default'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
