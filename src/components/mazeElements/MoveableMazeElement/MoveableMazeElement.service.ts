import { RefObject } from 'react';
import {
  DropTargetMonitor,
  DropTargetHookSpec,
  DragSourceHookSpec,
} from 'react-dnd';
import MazeElement from '../../../types/models/Maze/Structure/MazeElement';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import MazeDropCollectedProps from '../../../types/util/dnd/maze/MazeDropCollectedProps';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';

export function buildElementDropOptions(
  droppableItemType: string,
  ref: RefObject<HTMLDivElement>,
  droppableElement: MazeElement,
  moveElement: MoveMazeElement
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: droppableItemType,
    drop: (draggedItem) =>
      onDrop(ref, draggedItem, droppableElement, moveElement),
    collect: collectDragProps,
  };
}

function onDrop(
  ref: RefObject<HTMLDivElement>,
  draggedItem: MazeDragElement,
  droppableElement: MazeElement,
  moveElement: MoveMazeElement
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

export function buildElementDragOptions(
  { type, location }: MazeElement,
  ref: RefObject<HTMLDivElement>,
  dragItemType: string,
  dragItemNoneTypes: string[],
  className: string
): DragSourceHookSpec<MazeDragElement, unknown, unknown> {
  return {
    item: {
      type: dragItemType,
      elementType: type,
      location,
      className,
    },
    canDrag: !dragItemNoneTypes.includes(type),
    end: () => onDragEnd(ref),
  };
}

function onDragEnd(ref: RefObject<HTMLDivElement>): void {
  ref?.current?.blur();
  ref?.current?.classList.remove('hover');
}
