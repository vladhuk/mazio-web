import React, { forwardRef, RefObject } from 'react';
import '../MazeElement/MazeElement.scss';
import { useDrop } from 'react-dnd';
import {
  MazeElement as IMazeElement,
  Location,
} from '../../../types/models/Maze/Structure';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';
import { buildElementDropOptions } from './MoveableMazeElement.service';
import MazeElement from '../MazeElement';

interface Props {
  element: IMazeElement;
  dragItemType: string;
  dragItemNoneType: string;
  className?: string;
  moveElement: (source: Location, target: Location) => void;
}

const DroppableMazeElement = forwardRef<HTMLDivElement, Props>(
  ({ element, dragItemType, className, moveElement }, ref) => {
    const castedRef = ref as RefObject<HTMLDivElement>;

    const [{ isOver }, drop] = useDrop<
      MazeDragElement,
      unknown,
      MazeDropCollectedProps
    >(
      buildElementDropOptions(
        dragItemType,
        castedRef,
        element.location,
        moveElement
      )
    );
    drop(castedRef);

    const dragHoverClassName = isOver ? 'hover drag-hover' : '';
    const elementClassName = `${dragHoverClassName} ${className}`;

    return <MazeElement ref={ref} className={elementClassName} />;
  }
);

export default DroppableMazeElement;
