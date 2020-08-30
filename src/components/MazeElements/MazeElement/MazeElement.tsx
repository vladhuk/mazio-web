import React, { FunctionComponent, useRef, useState } from 'react';
import './MazeElement.scss';
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
} from './MazeElement.service';

interface Props {
  element: IMazeElement;
  dragItemType: string;
  dragItemNoneType: string;
  className?: string;
  moveElement(source: Location, target: Location): void;
}

const MazeElement: FunctionComponent<Props> = ({
  element,
  dragItemType,
  dragItemNoneType,
  className,
  moveElement,
}) => {
  const [isHover, setHover] = useState(false);
  const [isFocus, setFocus] = useState(false);

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
  const hoverClassName = isHover ? 'hover' : '';
  const elementClassName = `maze-element ${dragHoverClassName} ${hoverClassName} ${className}`;

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={elementClassName}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setTimeout(() => setFocus(true), 200)}
      onBlur={() => setFocus(false)}
      onClick={() => isFocus && ref?.current?.blur()}
      onKeyDown={(event) => event.key === 'Escape' && ref?.current?.blur()}
    />
  );
};

export default MazeElement;
