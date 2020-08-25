import React, { FunctionComponent, useRef } from 'react';
import './Cell.scss';
import { useDrag, useDrop } from 'react-dnd';
import { Cell as ICell, Location } from '../../../types/models/Maze/Structure';
import {
  getCssClassNameFromCellType,
  buildCellDragOptions,
} from './Cell.service';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';
import { buildElementDropOptions } from '../Maze.service';
import { ItemType } from '../../../constants';

interface Props {
  cell: ICell;
  moveCell(source: Location, target: Location): void;
}

const Cell: FunctionComponent<Props> = ({ cell, moveCell }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<MazeDragElement, unknown, unknown>(
    buildCellDragOptions(cell)
  );

  const [{ isOver }, drop] = useDrop<
    MazeDragElement,
    unknown,
    MazeDropCollectedProps
  >(buildElementDropOptions(ItemType.MAZE_CELL, ref, cell.location, moveCell));

  drag(drop(ref));

  const cellTypeClassName = getCssClassNameFromCellType(cell.type);
  const isOverClassName = isOver ? 'hover' : '';
  const className = `maze-element cell ${cellTypeClassName} ${isOverClassName}`;

  return <div ref={ref} tabIndex={0} className={className} />;
};

export default Cell;
