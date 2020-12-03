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
import MazeElementMovingValidator from '../../../types/util/validators/maze/MazeElementMovingValidator';

export function buildElementDropOptions(
  droppableItemType: string,
  ref: RefObject<HTMLDivElement>,
  droppableElement: MazeElement,
  getMoveElement: (sourceType: string) => MoveMazeElement | undefined
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: droppableItemType,
    drop: (draggedItem) =>
      onDrop(ref, draggedItem, droppableElement, getMoveElement),
    collect: collectDragProps,
  };
}

function onDrop(
  ref: RefObject<HTMLDivElement>,
  draggedItem: MazeDragElement,
  droppableElement: MazeElement,
  getMoveElement: (sourceType: string) => MoveMazeElement | undefined
): void {
  const sourceElement = mapItemToMazeElement(draggedItem);
  const moveElement = getMoveElement(sourceElement.type);

  if (moveElement) {
    moveElement(sourceElement, droppableElement);
    setTimeout(() => ref?.current?.classList.add('hover'), 0);
  }
}

function mapItemToMazeElement(mazeDragElement: MazeDragElement): MazeElement {
  return {
    type: mazeDragElement.elementType,
    location: mazeDragElement.location,
  };
}

function collectDragProps(monitor: DropTargetMonitor): MazeDropCollectedProps {
  return {
    isOver: monitor.isOver(),
    draggedItem: monitor.getItem(),
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

function validateElementMoving(
  validators: MazeElementMovingValidator[],
  sourceType: string,
  targetType: string
): boolean {
  return validators
    .map((validator) => validator(sourceType, targetType))
    .some((value) => value);
}

export function bindElementValidatorBySourceType(
  validators: MazeElementMovingValidator[],
  targetType: string
): (sourceType: string) => boolean {
  return (sourceType) =>
    validateElementMoving(validators, sourceType, targetType);
}
