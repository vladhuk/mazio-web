import React, { FunctionComponent, useRef, useState } from 'react';
import './Cell.scss';
import { useDrag, useDrop } from 'react-dnd';
import {
  Cell as ICell,
  Location,
  CellType,
} from '../../../types/models/Maze/Structure';
import { getCssClassNameFromCellType } from './Cell.service';
import {
  MazeDragElement,
  MazeDropCollectedProps,
} from '../../../types/models/dnd/maze';
import {
  buildElementDropOptions,
  buildElementDragOptions,
} from '../Maze.service';
import { ItemType } from '../../../constants';

interface Props {
  cell: ICell;
  moveCell(source: Location, target: Location): void;
}

const Cell: FunctionComponent<Props> = ({ cell, moveCell }) => {
  // Hover is handled by hands for more flexibility. Currently we need to remove hover
  // classname from drag source after dropping
  const [isHover, setHover] = useState(false);
  const [isFocus, setFocus] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<MazeDragElement, unknown, unknown>(
    buildElementDragOptions(cell, ref, ItemType.MAZE_CELL, CellType.NONE)
  );

  const [{ isOver }, drop] = useDrop<
    MazeDragElement,
    unknown,
    MazeDropCollectedProps
  >(buildElementDropOptions(ItemType.MAZE_CELL, ref, cell.location, moveCell));

  drag(drop(ref));

  const cellTypeClassName = getCssClassNameFromCellType(cell.type);
  const isOverClassName = isOver ? 'over' : '';
  const isHoverClassName = isHover ? 'hover' : '';
  const className = `maze-element cell ${cellTypeClassName} ${isOverClassName} ${isHoverClassName}`;

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setTimeout(() => setFocus(true), 200)}
      onBlur={() => setFocus(false)}
      onClick={() => isFocus && ref?.current?.blur()}
      onKeyDown={(event) => event.key === 'Escape' && ref?.current?.blur()}
    />
  );
};

export default Cell;
