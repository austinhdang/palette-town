import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

function DraggableColorList(props) {
  const { colors, removeColor } = props;
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          color={color.color}
          index={index}
          name={color.name}
          key={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
}

export default SortableContainer(DraggableColorList);
