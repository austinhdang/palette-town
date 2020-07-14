import React from 'react';
import chroma from 'chroma-js';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  DraggableColorBox: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '& svg': {
      color: 'rgba(0, 0, 0, 0.5)',
      fontSize: 'large',
      marginTop: '-3.5px',
      transition: 'all 0.3s ease-in-out',
    },
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)',
    },
  },
  boxContent: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    padding: '10px',
    left: '0',
    bottom: '0',
    color: (props) =>
      chroma.contrast(props.color, 'white') < 4.5
        ? 'rgba(0, 0, 0, 0.8)'
        : 'white',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
};

function DraggableColorBox(props) {
  const { classes, color, name, handleClick } = props;
  return (
    <div
      className={classes.DraggableColorBox}
      style={{ backgroundColor: color }}
    >
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon onClick={handleClick} />
      </div>
    </div>
  );
}

export default SortableElement(withStyles(styles)(DraggableColorBox));
