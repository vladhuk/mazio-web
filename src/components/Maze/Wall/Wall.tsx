import React, { FunctionComponent } from 'react';
import './Wall.scss';
import {
  getCssClassNameFromWallType,
  getCssClassNameFromWallPosition,
} from './Wall.service';
import { WallType } from '../../../types/models/Maze/Structure';

export enum WallPosition {
  HORIZONTAL,
  VERTICAL,
}

interface Props {
  position: WallPosition;
  type: WallType;
}

const Wall: FunctionComponent<Props> = ({ position, type }) => {
  const positionClassName = getCssClassNameFromWallPosition(position);
  const wallTypeClassName = getCssClassNameFromWallType(type);

  const className = `wall ${positionClassName} ${wallTypeClassName}`;

  return <div tabIndex={0} className={className} />;
};

export default Wall;
