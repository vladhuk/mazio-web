import UnidentifiedWallTypeError from '../../../errors/UnidentifiedWallTypeError';
import { WallType } from '../../../types/models/Maze/Structure/Wall';
import MazeElementMovingValidator from '../../../types/util/validators/maze/MazeElementMovingValidator';
import { WallPosition } from './Wall';

export function getCssClassNameFromWallPosition(
  position: WallPosition
): string {
  return `wall-${position === WallPosition.HORIZONTAL ? 'h' : 'v'}`;
}

export function getCssClassNameFromWallType(type: WallType): string {
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
    case WallType.NONE:
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
