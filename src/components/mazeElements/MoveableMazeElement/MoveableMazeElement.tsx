import React, { FunctionComponent, useRef } from 'react';
import '../MazeElement/MazeElement.scss';
import { useDrag } from 'react-dnd';
import IMazeElement, {
  IMazeElementType,
} from '../../../types/models/Maze/Structure/MazeElement';
import MazeDragElement, {
  MazeDragItemType,
} from '../../../types/util/dnd/maze/MazeDragElement';
import { buildElementDragOptions } from './MoveableMazeElement.service';
import MazeElement from '../MazeElement';
import DroppableMazeElement from './DroppableMazeElement';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';
import MazeElementMovingValidator from '../../../types/util/validators/maze/MazeElementMovingValidator';

interface Props {
  element: IMazeElement;
  dragItemType: MazeDragItemType;
  dragElementNoneTypes: IMazeElementType[];
  className?: string;
  moveElement?: MoveMazeElement;
  elementMovingValidators?: MazeElementMovingValidator[];
}

const MoveableMazeElement: FunctionComponent<Props> = ({
  element,
  dragItemType,
  dragElementNoneTypes,
  className,
  moveElement,
  elementMovingValidators,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<MazeDragElement, unknown, unknown>(
    buildElementDragOptions(
      element,
      ref,
      dragItemType,
      dragElementNoneTypes,
      className || ''
    )
  );

  drag(ref);

  return moveElement ? (
    <DroppableMazeElement
      ref={ref}
      className={className}
      element={element}
      dragItemType={dragItemType}
      moveElement={moveElement}
      elementMovingValidators={elementMovingValidators}
    />
  ) : (
    <MazeElement ref={ref} className={className} />
  );
};

export default MoveableMazeElement;
