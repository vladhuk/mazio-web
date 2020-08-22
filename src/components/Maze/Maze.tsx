import React, { FunctionComponent, useState } from 'react';
import { Container } from 'react-bootstrap';
import { range } from 'lodash';
import Structure, { Location } from '../../types/models/Maze/Structure';
import { buildWalls, buildCells, swapElementsInMaze } from './Maze.service';
import MazeWallsRow from './MazeWallsRow';
import MazeWallsAndCellsRow from './MazeWallsAndCellsRow';

type Props = Structure;

const Maze: FunctionComponent<Props> = ({ size, walls, cells }) => {
  const [wallTypesRows, setWallTypesRows] = useState(buildWalls(size, walls));
  const [cellTypesRows, setCellTypesRows] = useState(buildCells(size, cells));

  const moveCell = (source: Location, target: Location): void => {
    const newRows = swapElementsInMaze(cellTypesRows, source, target);
    setCellTypesRows(newRows);
  };

  const rows = range(size.height).map((y) => (
    <>
      <MazeWallsRow wallTypes={wallTypesRows[y * 2]} />
      <MazeWallsAndCellsRow
        wallTypes={wallTypesRows[y * 2 + 1]}
        cellTypes={cellTypesRows[y]}
        colNumber={y}
        moveCell={moveCell}
      />
    </>
  ));

  rows.push(
    <MazeWallsRow wallTypes={wallTypesRows[wallTypesRows.length - 1]} />
  );

  return <Container className="maze">{rows}</Container>;
};

export default Maze;
