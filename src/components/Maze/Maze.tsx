import React, { FunctionComponent, useState } from 'react';
import { range } from 'lodash';
import Structure from '../../types/models/Maze/Structure';
import { buildWalls, buildCells, bindMoveElement } from './Maze.service';
import MazeWallsRow from './MazeWallsRow';
import MazeWallsAndCellsRow from './MazeWallsAndCellsRow';

type Props = Structure;

const Maze: FunctionComponent<Props> = ({ size, walls, cells }) => {
  const [wallsRows, setWallsRows] = useState(buildWalls(size, walls));
  const [cellsRows, setCellsRows] = useState(buildCells(size, cells));

  const moveWall = bindMoveElement(wallsRows, setWallsRows);
  const moveCell = bindMoveElement(cellsRows, setCellsRows);

  const rows = range(size.height).map((y) => (
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
