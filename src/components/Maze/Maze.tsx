import React, { FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import { range } from 'lodash';
import Structure from '../../types/models/Maze/Structure';
import { buildWalls, buildCells } from './Maze.service';
import MazeWallsRow from './MazeWallsRow';
import MazeWallsAndCellsRow from './MazeWallsAndCellsRow';

type Props = Structure;

const Maze: FunctionComponent<Props> = ({ size, walls, cells }: Props) => {
  const wallTypesRows = buildWalls(size, walls);
  const cellTypesRows = buildCells(size, cells);

  const rows = range(size.height).map((y) => (
    <>
      <MazeWallsRow wallTypes={wallTypesRows[y * 2]} />
      <MazeWallsAndCellsRow
        wallTypes={wallTypesRows[y * 2 + 1]}
        cellTypes={cellTypesRows[y]}
      />
    </>
  ));

  rows.push(
    <MazeWallsRow wallTypes={wallTypesRows[wallTypesRows.length - 1]} />
  );

  return <Container className="maze">{rows}</Container>;
};

export default Maze;
