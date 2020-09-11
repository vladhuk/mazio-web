import React, { FunctionComponent } from 'react';
import './Cell.scss';
import {
  Cell as ICell,
  Location,
  CellType,
} from '../../../types/models/Maze/Structure';
import { ItemType } from '../../../constants';
import MoveableMazeElement from '../MoveableMazeElement';
import { getCssClassNameFromCellType } from './Cell.service';

interface Props {
  cell: ICell;
  moveCell?: (source: Location, target: Location) => void;
}

const Cell: FunctionComponent<Props> = ({ cell, moveCell }) => {
  const cellTypeClassName = getCssClassNameFromCellType(cell.type);

  return (
    <MoveableMazeElement
      className={`cell ${cellTypeClassName}`}
      element={cell}
      dragItemType={ItemType.MAZE_CELL}
      dragItemNoneType={CellType.NONE}
      moveElement={moveCell}
    />
  );
};

export default Cell;
