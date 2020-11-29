import { DropTargetHookSpec } from 'react-dnd';
import { ItemType } from '../../../constants';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/util/dnd/maze';
import { MazeElement } from '../../../types/models/Maze/Structure';

// eslint-disable-next-line import/prefer-default-export
export function buildMazeEditorDropContextOptions(
  removeElement: (element: MazeElement) => void
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: [ItemType.MAZE_CELL, ItemType.MAZE_WALL],
    drop: (item, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        removeElement({
          type: item.elementType,
          location: item.location,
        });
      }
    },
  };
}
