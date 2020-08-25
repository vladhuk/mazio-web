import React, { FunctionComponent, useRef } from 'react';
import './Wall.scss';
import { useDrop, useDrag } from 'react-dnd';
import {
  getCssClassNameFromWallType,
  getCssClassNameFromWallPosition,
  buildWallDragOptions,
} from './Wall.service';
import { Wall as IWall, Location } from '../../../types/models/Maze/Structure';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';
import { buildElementDropOptions } from '../Maze.service';
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
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<MazeDragElement, unknown, unknown>(
    buildWallDragOptions(wall)
  );

  const [{ isOver }, drop] = useDrop<
    MazeDragElement,
    unknown,
    MazeDropCollectedProps
  >(buildElementDropOptions(ItemType.MAZE_WALL, ref, wall.location, moveWall));

  drag(drop(ref));

  const positionClassName = getCssClassNameFromWallPosition(position);
  const wallTypeClassName = getCssClassNameFromWallType(wall.type);
  const isOverClassName = isOver ? 'hover' : '';

  const className = `maze-element wall ${positionClassName} ${wallTypeClassName} ${isOverClassName}`;

  return <div ref={ref} tabIndex={0} className={className} />;
};

export default Wall;
