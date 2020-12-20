import React, { forwardRef, RefObject } from 'react';
import '../MazeElement/MazeElement.scss';
import { useDrop } from 'react-dnd';
import {
  buildElementDropOptions,
  bindElementValidatorBySourceType,
} from './MoveableMazeElement.service';
import MazeElement from '../MazeElement';
import IMazeElement from '../../../types/models/Maze/Structure/MazeElement';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import MazeDropCollectedProps from '../../../types/util/dnd/maze/MazeDropCollectedProps';
import MazeElementMovingValidator from '../../../types/util/validators/maze/MazeElementMovingValidator';

interface Props {
  element: IMazeElement;
  dragItemType: string;
  className?: string;
  moveElement: MoveMazeElement;
  elementMovingValidators?: MazeElementMovingValidator[];
}

const DroppableMazeElement = forwardRef<HTMLDivElement, Props>(
  (
    { element, dragItemType, className, moveElement, elementMovingValidators },
    ref
  ) => {
    const castedRef = ref as RefObject<HTMLDivElement>;

    const validateMoving = elementMovingValidators
      ? bindElementValidatorBySourceType(elementMovingValidators, element.type)
      : () => true;

    const getMoveElement = (sourceType: string) =>
      validateMoving(sourceType) ? moveElement : undefined;

    const [{ draggedItem, isOver }, drop] = useDrop<
      MazeDragElement,
      unknown,
      MazeDropCollectedProps
    >(buildElementDropOptions(dragItemType, element, getMoveElement));

    drop(castedRef);

    const dragHoverClassName =
      isOver && draggedItem && validateMoving(draggedItem.elementType)
        ? 'drag-hover'
        : '';
    const elementClassName = `${dragHoverClassName} ${className}`;

    return <MazeElement ref={ref} className={elementClassName} />;
  }
);

export default DroppableMazeElement;
