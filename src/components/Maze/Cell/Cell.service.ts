import { DragSourceHookSpec } from 'react-dnd';
import { CellType, Cell } from '../../../types/models/Maze/Structure';
import { MazeDragElement } from '../../../types/models/dnd/maze';
import { ItemType } from '../../../constants';

export function getCssClassNameFromCellType(type: CellType): string {
  switch (type) {
    case CellType.ARSENAL:
      return 'cell-arsenal';
    case CellType.HOSPITAL:
      return 'cell-hospital';
    case CellType.TREASURE:
      return 'cell-treasure';
    case CellType.FAKE_TREASURE:
      return 'cell-fake-treasure';
    case CellType.SPAWN:
      return 'cell-spawn';
    case CellType.RIVER:
      return 'cell-river';
    case CellType.RIVER_START:
      return 'cell-river-start';
    case CellType.RIVER_END:
      return 'cell-river-end';
    case CellType.TRAP:
      return 'cell-trap';
    case CellType.PIT_IN:
      return 'cell-pit-in';
    case CellType.PIT_OUT:
      return 'cell-pit-out';
    case CellType.NONE:
    default:
      return 'cell-none';
  }
}

export function buildCellDragOptions({
  type,
  location,
}: Cell): DragSourceHookSpec<MazeDragElement, unknown, unknown> {
  return {
    item: { type: ItemType.MAZE_CELL, location },
    canDrag: type !== CellType.NONE,
  };
}
