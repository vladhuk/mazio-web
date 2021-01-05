import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import MazeDragElement, {
  MazeDragItemType,
} from '../../types/util/dnd/maze/MazeDragElement';
import MazeDropCollectedProps from '../../types/util/dnd/maze/MazeDropCollectedProps';
import MazeElementDragLayer from '../mazeElements/MazeElementDragLayer';

const MazeDropContextAndDragLayer: FunctionComponent = ({ children }) => {
  const [{ isOver }, drop] = useDrop<
    MazeDragElement,
    unknown,
    MazeDropCollectedProps
  >({
    accept: [MazeDragItemType.CELL, MazeDragItemType.WALL],
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <>
      <MazeElementDragLayer isOutsideMaze={!isOver} />
      <div className="w-100 h-100" ref={drop}>
        {children}
      </div>
    </>
  );
};

export default MazeDropContextAndDragLayer;
