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
  droppableElement: MazeElement,
  getMoveElement: (sourceType: string) => MoveMazeElement | undefined
): DropTargetHookSpec<MazeDragElement, unknown, MazeDropCollectedProps> {
  return {
    accept: droppableItemType,
    drop: (draggedItem) =>
      onDrop(draggedItem, droppableElement, getMoveElement),
    collect: collectDragProps,
  };
}

function onDrop(
  draggedItem: MazeDragElement,
  droppableElement: MazeElement,
  getMoveElement: (sourceType: string) => MoveMazeElement | undefined
): void {
  const sourceElement = mapItemToMazeElement(draggedItem);
  const moveElement = getMoveElement(sourceElement.type);

  moveElement?.(sourceElement, droppableElement);
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
    end: () => ref?.current?.blur(),
  };
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
