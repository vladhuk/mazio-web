import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../constants';
import { MazeDragElement } from '../../types/models/dnd/maze';

const MazeEditorDropContext: FunctionComponent = ({ children }) => {
  const [, drop] = useDrop<MazeDragElement, unknown, unknown>({
    accept: [ItemType.MAZE_CELL, ItemType.MAZE_WALL],
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <div ref={drop} className="vh-100">
      {children}
    </div>
  );
};

export default MazeEditorDropContext;
