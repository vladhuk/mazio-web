import React, { FunctionComponent } from 'react';
import './Cell.scss';
import MoveableMazeElement from '../MoveableMazeElement';
import { getCssClassNameFromCellType } from './Cell.service';
import MoveMazeElement from '../../../types/util/dnd/maze/MoveMazeElement';
import { MazeDragItemType } from '../../../types/util/dnd/maze/MazeDragElement';
import MazeElement, {
  MazeElementBaseType,
} from '../../../types/models/Maze/Structure/MazeElement';

interface Props {
  cell: MazeElement;
  moveCell?: MoveMazeElement;
}

const Cell: FunctionComponent<Props> = ({ cell, moveCell }) => {
  const cellTypeClassName = getCssClassNameFromCellType(cell.type);

  return (
    <MoveableMazeElement
      className={`cell ${cellTypeClassName}`}
      element={cell}
      dragItemType={MazeDragItemType.CELL}
      dragElementNoneTypes={[MazeElementBaseType.NONE]}
      moveElement={moveCell}
    />
  );
};

export default Cell;
