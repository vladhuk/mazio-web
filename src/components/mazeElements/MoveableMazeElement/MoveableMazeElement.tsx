import React, { FunctionComponent, useEffect, useRef } from 'react';
import '../MazeElement/MazeElement.scss';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import IMazeElement from '../../../types/models/Maze/Structure/MazeElement';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import { buildElementDragOptions } from './MoveableMazeElement.service';
import MazeElement from '../MazeElement';
import DroppableMazeElement from './DroppableMazeElement';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';

interface Props {
  element: IMazeElement;
  dragItemType: string;
  dragItemNoneType: string;
  className?: string;
  moveElement?: MoveMazeElement;
}

const MoveableMazeElement: FunctionComponent<Props> = ({
  element,
  dragItemType,
  dragItemNoneType,
  className,
  moveElement,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag, preview] = useDrag<MazeDragElement, unknown, unknown>(
    buildElementDragOptions(
      element,
      ref,
      dragItemType,
      dragItemNoneType,
      className || ''
    )
  );

  drag(ref);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return moveElement ? (
    <DroppableMazeElement
      ref={ref}
      className={className}
      element={element}
      dragItemType={dragItemType}
      moveElement={moveElement}
    />
  ) : (
    <MazeElement ref={ref} className={className} />
  );
};

export default MoveableMazeElement;
