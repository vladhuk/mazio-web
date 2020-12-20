import React, { FunctionComponent, useRef } from 'react';
import '../MazeElement/MazeElement.scss';
import { useDrag } from 'react-dnd';
import IMazeElement from '../../../types/models/Maze/Structure/MazeElement';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import { buildElementDragOptions } from './MoveableMazeElement.service';
import MazeElement from '../MazeElement';
import DroppableMazeElement from './DroppableMazeElement';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';
import MazeElementMovingValidator from '../../../types/util/validators/maze/MazeElementMovingValidator';

interface Props {
  element: IMazeElement;
  dragItemType: string;
  dragItemNoneTypes: string[];
  className?: string;
  moveElement?: MoveMazeElement;
  elementMovingValidators?: MazeElementMovingValidator[];
}

const MoveableMazeElement: FunctionComponent<Props> = ({
  element,
  dragItemType,
  dragItemNoneTypes,
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
      dragItemNoneTypes,
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
