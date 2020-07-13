import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  DraggableColorBox: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
  },
};

function DraggableColorBox(props) {
  const { classes } = props;
  return (
    <div
      className={classes.DraggableColorBox}
      style={{ backgroundColor: props.color }}
    >
      {props.color}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
