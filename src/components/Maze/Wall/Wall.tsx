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
  // Hover is handled by hands for more flexibility. Currently we need to remove hover
  // classname from drag source after dropping
  const [isHover, setHover] = useState(false);

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
  const isOverClassName = isOver ? 'over' : '';
  const isHoverClassName = isHover ? 'hover' : '';

  const className = `maze-element wall ${positionClassName} ${wallTypeClassName} ${isOverClassName} ${isHoverClassName}`;

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export default Wall;
