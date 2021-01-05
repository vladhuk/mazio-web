import React, { FunctionComponent } from 'react';
import './Wall.scss';
import {
  getCssClassNameFromWallType,
  getCssClassNameFromWallPosition,
  validateMazeWallMoving,
} from './Wall.service';
import MazeElement, {
  MazeElementBaseType,
  WallType,
} from '../../../types/models/Maze/Structure/MazeElement';
import MoveableMazeElement from '../MoveableMazeElement';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';
import { MazeDragItemType } from '../../../types/util/dnd/maze/MazeDragElement';

export enum WallPosition {
  HORIZONTAL,
  VERTICAL,
}

interface Props {
  position: WallPosition;
  wall: MazeElement;
  moveWall?: MoveMazeElement;
}

const Wall: FunctionComponent<Props> = ({ position, wall, moveWall }) => {
  const positionClassName = getCssClassNameFromWallPosition(position);
  const wallTypeClassName = getCssClassNameFromWallType(wall.type);

  const className = `wall ${positionClassName} ${wallTypeClassName}`;

  return (
    <MoveableMazeElement
      className={className}
      element={wall}
      dragItemType={MazeDragItemType.WALL}
      dragElementNoneTypes={[MazeElementBaseType.NONE, WallType.EXTERNAL]}
      moveElement={moveWall}
      elementMovingValidators={[validateMazeWallMoving]}
    />
  );
};

export default Wall;
