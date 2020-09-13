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
import { MazeElement } from '../../../types/models/Maze/Structure';

function onDrop(
  ref: RefObject<HTMLDivElement>,
  draggedItem: MazeDragElement,
  droppableElement: MazeElement,
  moveElement: (source: MazeElement, target: MazeElement) => void
): void {
  const sourceElement = {
    type: draggedItem.elementType,
    location: draggedItem.location,
  };
  moveElement(sourceElement, droppableElement);
  setTimeout(() => ref?.current?.classList.add('hover'), 0);
}

function collectDragProps(monitor: DropTargetMonitor): MazeDropCollectedProps {
  return {
    isOver: monitor.isOver(),
  };
}

export function buildElementDropOptions(
  droppableItemType: string,
  ref: RefObject<HTMLDivElement>,
  droppableElement: MazeElement,
  moveElement: (source: MazeElement, target: MazeElement) => void
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: droppableItemType,
    drop: (draggedItem) =>
      onDrop(ref, draggedItem, droppableElement, moveElement),
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
  draggedItemType: string,
  noneElementType: string,
  className: string
): DragSourceHookSpec<MazeDragElement, unknown, unknown> {
  return {
    item: {
      type: draggedItemType,
      elementType: type,
      location,
      className,
    },
    canDrag: type !== noneElementType,
    end: () => onDragEnd(ref),
  };
}
