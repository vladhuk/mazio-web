/* eslint-disable react/no-array-index-key */

import React, { FunctionComponent } from 'react';
import { Row, Container } from 'react-bootstrap';
import Cell from './Cell';
import Structure, {
  WallType,
  CellType,
} from '../../types/models/Maze/Structure';
import { buildWalls, buildCells } from './Maze.service';
import Wall, { WallPosition } from './Wall';

type Props = Structure;

const Maze: FunctionComponent<Props> = ({ size, walls, cells }: Props) => {
  const wallsMatrix = buildWalls(size, walls);
  const cellsMatrix = buildCells(size, cells);

  const getRowElements = (
    wallsRow: WallType[],
    cellsRow: CellType[]
  ): JSX.Element => {
    const elements = [];
    for (let x = 0; x < cellsRow.length; x += 1) {
      elements.push(
        <Wall position={WallPosition.VERTICAL} type={wallsRow[x]} />
      );
      elements.push(<Cell type={cellsRow[x]} />);
    }
    elements.push(
      <Wall position={WallPosition.VERTICAL} type={wallsRow[cellsRow.length]} />
    );

    return <>{elements}</>;
  };

  const getWallsRow = (wallsRow: WallType[]): JSX.Element[] => {
    return wallsRow.map((wall, x) => (
      <Wall position={WallPosition.HORIZONTAL} type={wallsRow[x]} />
    ));
  };

  const rows = [];

  for (let y = 0; y < size.height; y += 1) {
    rows.push(<Row>{getWallsRow(wallsMatrix[y * 2])}</Row>);
    rows.push(
      <Row>{getRowElements(wallsMatrix[y * 2 + 1], cellsMatrix[y])}</Row>
    );
  }
  rows.push(<Row>{getWallsRow(wallsMatrix[wallsMatrix.length - 1])}</Row>);

  return <Container className="maze">{rows}</Container>;
};

export default Maze;
