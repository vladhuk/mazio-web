import React, { FunctionComponent } from 'react';
import './Wall.scss';
import {
  getCssClassNameFromWallType,
  getCssClassNameFromWallPosition,
} from './Wall.service';
import IWall, { WallType } from '../../../types/models/Maze/Structure/Wall';
import { ItemType } from '../../../constants';
import MoveableMazeElement from '../MoveableMazeElement';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';

export enum WallPosition {
  HORIZONTAL,
  VERTICAL,
}

interface Props {
  position: WallPosition;
  wall: IWall;
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
      dragItemType={ItemType.MAZE_WALL}
      dragItemNoneTypes={[WallType.NONE]}
      moveElement={moveWall}
    />
  );
};

export default Wall;
