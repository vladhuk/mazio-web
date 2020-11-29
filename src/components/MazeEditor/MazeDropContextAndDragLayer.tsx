import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../constants';
import MazeDragElement from '../../types/util/dnd/maze/MazeDragElement';
import MazeDropCollectedProps from '../../types/util/dnd/maze/MazeDropCollectedProps';
import MazeElementDragLayer from '../mazeElements/MazeElementDragLayer';

const MazeDropContextAndDragLayer: FunctionComponent = ({ children }) => {
  const [{ isOver }, drop] = useDrop<
    MazeDragElement,
    unknown,
    MazeDropCollectedProps
  >({
    accept: [ItemType.MAZE_CELL, ItemType.MAZE_WALL],
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <>
      <MazeElementDragLayer isOutsideMaze={!isOver} />
      <div ref={drop}>{children}</div>
    </>
  );
};

export default MazeDropContextAndDragLayer;
