import { DropTargetHookSpec } from 'react-dnd';
import { ItemType } from '../../../constants';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import MazeDropCollectedProps from '../../../types/util/dnd/maze/MazeDropCollectedProps';
import RemoveMazeElement from '../../../types/util/dnd/maze/RemoveMazeElement';

// eslint-disable-next-line import/prefer-default-export
export function buildMazeEditorDropContextOptions(
  getRemoveElement: (itemType: string) => RemoveMazeElement | undefined
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: [ItemType.MAZE_CELL, ItemType.MAZE_WALL],
    drop: (item, monitor) => {
      const removeElement = getRemoveElement(item.type.toString());
      if (removeElement && monitor.isOver({ shallow: true })) {
        removeElement({
          type: item.elementType,
          location: item.location,
        });
      }
    },
  };
}
