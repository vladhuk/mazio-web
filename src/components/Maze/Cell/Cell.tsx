import React, { FunctionComponent, useRef } from 'react';
import './Cell.scss';
import { useDrag, useDrop } from 'react-dnd';
import { CellType, Location } from '../../../types/models/Maze/Structure';
import {
  getCssClassNameFromCellType,
  buildCellDragOptions,
  buildCellDropOptions,
} from './Cell.service';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';

interface Props {
  type: CellType;
  location: Location;
  moveCell(source: Location, target: Location): void;
}

const Cell: FunctionComponent<Props> = ({ type, location, moveCell }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<MazeDragElement, unknown, unknown>(
    buildCellDragOptions({ type, location })
  );

  const [{ isOver }, drop] = useDrop<
    MazeDragElement,
    unknown,
    MazeDropCollectedProps
  >(buildCellDropOptions(ref, location, moveCell));

  drag(drop(ref));

  const cellTypeClassName = getCssClassNameFromCellType(type);
  const isOverClassName = isOver ? 'cell-onhover' : '';
  const className = `cell ${cellTypeClassName} ${isOverClassName}`;

  return <div ref={ref} tabIndex={0} className={className} />;
};

export default Cell;
