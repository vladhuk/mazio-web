import { DropTargetHookSpec } from 'react-dnd';
import { ItemType } from '../../../constants';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import MazeDropCollectedProps from '../../../types/util/dnd/maze/MazeDropCollectedProps';
import RemoveMazeElement from '../../../types/util/dnd/maze/RemoveMazeElement';

// eslint-disable-next-line import/prefer-default-export
export function buildMazeEditorDropContextOptions(
  removeElement: RemoveMazeElement
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
