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
