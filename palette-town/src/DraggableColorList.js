import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

function DraggableColorList({ colors, removeColor }) {
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
