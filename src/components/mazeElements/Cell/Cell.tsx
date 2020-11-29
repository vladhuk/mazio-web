import React, { FunctionComponent } from 'react';
import './Cell.scss';
import ICell, { CellType } from '../../../types/models/Maze/Structure/Cell';
import { ItemType } from '../../../constants';
import MoveableMazeElement from '../MoveableMazeElement';
import { getCssClassNameFromCellType } from './Cell.service';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';

interface Props {
  cell: ICell;
  moveCell?: MoveMazeElement;
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
