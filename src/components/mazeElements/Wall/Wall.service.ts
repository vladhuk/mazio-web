import UnidentifiedWallTypeError from '../../../errors/UnidentifiedWallTypeError';
import {
  IMazeElementType,
  MazeElementBaseType,
  WallType,
} from '../../../types/models/Maze/Structure/MazeElement';
import MazeElementMovingValidator from '../../../types/util/validators/maze/MazeElementMovingValidator';
import { WallPosition } from './Wall';

export function getCssClassNameFromWallPosition(
  position: WallPosition
): string {
  return `wall-${position === WallPosition.HORIZONTAL ? 'h' : 'v'}`;
}

export function getCssClassNameFromWallType(type: IMazeElementType): string {
  switch (type) {
    case WallType.STONE:
      return 'wall-stone';
    case WallType.OUTPUT:
      return 'wall-output';
    case WallType.RUBBER:
      return 'wall-rubber';
    case WallType.TRANSLUCENT:
      return 'wall-translucent';
    case WallType.EXTERNAL:
      return 'wall-external';
    case MazeElementBaseType.NONE:
      return 'wall-none';
    default:
      throw new UnidentifiedWallTypeError(type);
  }
}

export const validateMazeWallMoving: MazeElementMovingValidator = (
  sourceType,
  targetType
) => {
  if (sourceType === WallType.OUTPUT && targetType !== WallType.EXTERNAL) {
    return false;
  }
  if (sourceType !== WallType.OUTPUT && targetType === WallType.EXTERNAL) {
    return false;
  }
  if (targetType === WallType.OUTPUT) {
    return false;
  }

  return true;
};
