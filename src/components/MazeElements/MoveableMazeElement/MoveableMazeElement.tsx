import React, { FunctionComponent, useRef } from 'react';
import '../MazeElement/MazeElement.scss';
import { useDrag, useDrop } from 'react-dnd';
import {
  MazeElement as IMazeElement,
  Location,
} from '../../../types/models/Maze/Structure';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';
import {
  buildElementDropOptions,
  buildElementDragOptions,
} from './MoveableMazeElement.service';
import MazeElement from '../MazeElement';

interface Props {
  element: IMazeElement;
  dragItemType: string;
  dragItemNoneType: string;
  className?: string;
  moveElement(source: Location, target: Location): void;
}

const MoveableMazeElement: FunctionComponent<Props> = ({
  element,
  dragItemType,
  dragItemNoneType,
  className,
  moveElement,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<MazeDragElement, unknown, unknown>(
    buildElementDragOptions(element, ref, dragItemType, dragItemNoneType)
  );

  const [{ isOver }, drop] = useDrop<
    MazeDragElement,
    unknown,
    MazeDropCollectedProps
  >(buildElementDropOptions(dragItemType, ref, element.location, moveElement));

  drag(drop(ref));

  const dragHoverClassName = isOver ? 'hover drag-hover' : '';
  const elementClassName = `${dragHoverClassName} ${className}`;

  return <MazeElement ref={ref} className={elementClassName} />;
};

export default MoveableMazeElement;
