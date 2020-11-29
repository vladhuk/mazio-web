import React, { FunctionComponent } from 'react';
import { range } from 'lodash';
import MazeWallsRow from './MazeWallsRow';
import MazeWallsAndCellsRow from './MazeWallsAndCellsRow';
import MoveMazeElement from '../../types/util/dnd/maze/MoveMazeElement';
import Cell from '../../types/models/Maze/Structure/Cell';
import Wall from '../../types/models/Maze/Structure/Wall';

interface Props {
  cellsRows: Cell[][];
  wallsRows: Wall[][];
  moveCell?: MoveMazeElement;
  moveWall?: MoveMazeElement;
}

const Maze: FunctionComponent<Props> = ({
  wallsRows,
  cellsRows,
  moveCell,
  moveWall,
}) => {
  const rows = range(cellsRows.length).map((y) => (
    <>
      <MazeWallsRow wallsRow={wallsRows[y * 2]} moveWall={moveWall} />
      <MazeWallsAndCellsRow
        wallsRow={wallsRows[y * 2 + 1]}
        cellsRow={cellsRows[y]}
        moveCell={moveCell}
        moveWall={moveWall}
      />
    </>
  ));

  rows.push(
    <MazeWallsRow
      wallsRow={wallsRows[wallsRows.length - 1]}
      moveWall={moveWall}
    />
  );

  return <div className="maze">{rows}</div>;
};

export default Maze;
