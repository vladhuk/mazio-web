import { WallPosition } from './Wall';
import { WallType } from '../../../types/models/Maze/Structure';

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
    default:
      return 'wall-none';
  }
}
