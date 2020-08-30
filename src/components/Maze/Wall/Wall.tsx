import React, { FunctionComponent, useRef, useState } from 'react';
import './Wall.scss';
import { useDrop, useDrag } from 'react-dnd';
import {
  getCssClassNameFromWallType,
  getCssClassNameFromWallPosition,
} from './Wall.service';
import {
  Wall as IWall,
  Location,
  WallType,
} from '../../../types/models/Maze/Structure';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';
import {
  buildElementDropOptions,
  buildElementDragOptions,
} from '../Maze.service';
import { ItemType } from '../../../constants';

export enum WallPosition {
  HORIZONTAL,
  VERTICAL,
}

interface Props {
  position: WallPosition;
  wall: IWall;
  moveWall(source: Location, target: Location): void;
}

const Wall: FunctionComponent<Props> = ({ position, wall, moveWall }) => {
  const [isHover, setHover] = useState(false);
  const [isFocus, setFocus] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<MazeDragElement, unknown, unknown>(
    buildElementDragOptions(wall, ref, ItemType.MAZE_WALL, WallType.NONE)
  );

  const [{ isOver }, drop] = useDrop<
    MazeDragElement,
    unknown,
    MazeDropCollectedProps
  >(buildElementDropOptions(ItemType.MAZE_WALL, ref, wall.location, moveWall));

  drag(drop(ref));

  const positionClassName = getCssClassNameFromWallPosition(position);
  const wallTypeClassName = getCssClassNameFromWallType(wall.type);
  const dragHoverClassName = isOver ? 'hover drag-hover' : '';
  const hoverClassName = isHover ? 'hover' : '';

  const className = `maze-element wall ${positionClassName} ${wallTypeClassName} ${dragHoverClassName} ${hoverClassName}`;

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setTimeout(() => setFocus(true), 200)}
      onBlur={() => setFocus(false)}
      onClick={() => isFocus && ref?.current?.blur()}
      onKeyDown={(event) => event.key === 'Escape' && ref?.current?.blur()}
    />
  );
};

export default Wall;
