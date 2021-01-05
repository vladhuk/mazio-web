import { DropTargetHookSpec } from 'react-dnd';
import MazeDragElement, {
  MazeDragItemType,
} from '../../../types/util/dnd/maze/MazeDragElement';
import MazeDropCollectedProps from '../../../types/util/dnd/maze/MazeDropCollectedProps';
import RemoveMazeElement from '../../../types/util/dnd/maze/RemoveMazeElement';

type GetRemoveElement = (
  itemType: MazeDragItemType
) => RemoveMazeElement | undefined;

// eslint-disable-next-line import/prefer-default-export
export function buildMazeEditorDropContextOptions(
  getRemoveElement: GetRemoveElement
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: [MazeDragItemType.CELL, MazeDragItemType.WALL],
    drop: (item, monitor) => {
      const removeElement = getRemoveElement(item.type);
      if (removeElement && monitor.isOver({ shallow: true })) {
        removeElement({
          type: item.elementType,
          location: item.location,
        });
      }
    },
  };
}
