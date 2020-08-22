import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { range } from 'lodash';
import {
  WallType,
  CellType,
  Location,
} from '../../types/models/Maze/Structure';
import Wall, { WallPosition } from './Wall';
import Cell from './Cell';

interface Props {
  wallTypes: WallType[];
  cellTypes: CellType[];
  colNumber: number;
  moveCell(source: Location, target: Location): void;
}

const MazeWallsAndCellsRow: FunctionComponent<Props> = ({
  wallTypes,
  cellTypes,
  colNumber,
  moveCell,
}) => {
  const elements = range(cellTypes.length).map((x) => (
    <>
      <Wall position={WallPosition.VERTICAL} type={wallTypes[x]} />
      <Cell
        type={cellTypes[x]}
        location={{ x, y: colNumber }}
        moveCell={moveCell}
      />
    </>
  ));
  elements.push(
    <Wall position={WallPosition.VERTICAL} type={wallTypes[cellTypes.length]} />
  );

  return <Row>{elements}</Row>;
};

export default MazeWallsAndCellsRow;
