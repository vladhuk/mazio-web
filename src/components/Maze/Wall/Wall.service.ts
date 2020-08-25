import { DragSourceHookSpec } from 'react-dnd';
import { WallPosition } from './Wall';
import { WallType, Wall } from '../../../types/models/Maze/Structure';
import { MazeDragElement } from '../../../types/models/dnd/maze';
import { ItemType } from '../../../constants';

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

export function buildWallDragOptions({
  type,
  location,
}: Wall): DragSourceHookSpec<MazeDragElement, unknown, unknown> {
  return {
    item: { type: ItemType.MAZE_WALL, location },
    canDrag: type !== WallType.NONE,
  };
}
