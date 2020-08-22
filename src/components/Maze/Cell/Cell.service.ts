import {
  DropTargetMonitor,
  DropTargetHookSpec,
  DragSourceHookSpec,
} from 'react-dnd';
import { RefObject } from 'react';
import { CellType, Cell, Location } from '../../../types/models/Maze/Structure';
import { ItemType } from '../../../constants';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';

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

function onDrop(
  item: MazeDragElement,
  ref: RefObject<HTMLDivElement>,
  location: Location,
  moveCell: (source: Location, target: Location) => void
): void {
  moveCell(item.location, location);
  if (ref && ref.current) {
    ref.current.focus();
  }
}

function collectDragProps(monitor: DropTargetMonitor): MazeDropCollectedProps {
  return {
    isOver: monitor.isOver(),
  };
}

export function buildCellDropOptions(
  ref: RefObject<HTMLDivElement>,
  location: Location,
  moveCell: (source: Location, target: Location) => void
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: ItemType.MAZE_CELL,
    drop: (item) => onDrop(item, ref, location, moveCell),
    collect: collectDragProps,
  };
}
