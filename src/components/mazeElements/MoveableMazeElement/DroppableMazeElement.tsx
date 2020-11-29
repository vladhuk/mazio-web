import React, { forwardRef, RefObject } from 'react';
import '../MazeElement/MazeElement.scss';
import { useDrop } from 'react-dnd';
import { buildElementDropOptions } from './MoveableMazeElement.service';
import MazeElement from '../MazeElement';
import IMazeElement from '../../../types/models/Maze/Structure/MazeElement';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import MazeDropCollectedProps from '../../../types/util/dnd/maze/MazeDropCollectedProps';

interface Props {
  element: IMazeElement;
  dragItemType: string;
  dragItemNoneType: string;
  className?: string;
  moveElement: MoveMazeElement;
}

const DroppableMazeElement = forwardRef<HTMLDivElement, Props>(
  ({ element, dragItemType, className, moveElement }, ref) => {
    const castedRef = ref as RefObject<HTMLDivElement>;

    const [{ isOver }, drop] = useDrop<
      MazeDragElement,
      unknown,
      MazeDropCollectedProps
    >(buildElementDropOptions(dragItemType, castedRef, element, moveElement));

    drop(castedRef);

    const dragHoverClassName = isOver ? 'hover drag-hover' : '';
    const elementClassName = `${dragHoverClassName} ${className}`;

    return <MazeElement ref={ref} className={elementClassName} />;
  }
);

export default DroppableMazeElement;
