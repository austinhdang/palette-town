import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';

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
