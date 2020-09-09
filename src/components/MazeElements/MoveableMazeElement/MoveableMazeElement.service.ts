import { RefObject } from 'react';
import {
  DropTargetMonitor,
  DropTargetHookSpec,
  DragSourceHookSpec,
} from 'react-dnd';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';
import { Location, MazeElement } from '../../../types/models/Maze/Structure';

function onDrop(
  item: MazeDragElement,
  ref: RefObject<HTMLDivElement>,
  location: Location,
  moveElement: (source: Location, target: Location) => void
): void {
  moveElement(item.location, location);
  setTimeout(() => ref?.current?.classList.add('hover'), 0);
}

function collectDragProps(monitor: DropTargetMonitor): MazeDropCollectedProps {
  return {
    isOver: monitor.isOver(),
  };
}

export function buildElementDropOptions(
  itemType: string,
  ref: RefObject<HTMLDivElement>,
  location: Location,
  moveElement: (source: Location, target: Location) => void
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: itemType,
    drop: (item) => onDrop(item, ref, location, moveElement),
    collect: collectDragProps,
  };
}

function onDragEnd(ref: RefObject<HTMLDivElement>): void {
  ref?.current?.blur();
  ref?.current?.classList.remove('hover');
}

export function buildElementDragOptions(
  { type, location }: MazeElement,
  ref: RefObject<HTMLDivElement>,
  itemType: string,
  noneType: string
): DragSourceHookSpec<MazeDragElement, unknown, unknown> {
  return {
    item: { type: itemType, location },
    canDrag: type !== noneType,
    end: () => onDragEnd(ref),
  };
}
