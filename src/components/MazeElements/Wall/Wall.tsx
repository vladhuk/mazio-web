import React, { FunctionComponent } from 'react';
import './Wall.scss';
import {
  getCssClassNameFromWallType,
  getCssClassNameFromWallPosition,
} from './Wall.service';
import {
  Wall as IWall,
  Location,
  WallType,
} from '../../../types/models/Maze/Structure';
import { ItemType } from '../../../constants';
import MoveableMazeElement from '../MoveableMazeElement';

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
  const positionClassName = getCssClassNameFromWallPosition(position);
  const wallTypeClassName = getCssClassNameFromWallType(wall.type);

  const className = `wall ${positionClassName} ${wallTypeClassName}`;

  return (
    <MoveableMazeElement
      className={className}
      element={wall}
      dragItemType={ItemType.MAZE_WALL}
      dragItemNoneType={WallType.NONE}
      moveElement={moveWall}
    />
  );
};

export default Wall;
