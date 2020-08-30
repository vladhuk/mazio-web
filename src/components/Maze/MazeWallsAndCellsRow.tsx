import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { range } from 'lodash';
import {
  Location,
  Wall as IWall,
  Cell as ICell,
} from '../../types/models/Maze/Structure';
import Wall, { WallPosition } from '../MazeElements/Wall';
import Cell from '../MazeElements/Cell';

interface Props {
  wallsRow: IWall[];
  cellsRow: ICell[];
  moveCell(source: Location, target: Location): void;
  moveWall(source: Location, target: Location): void;
}

const MazeWallsAndCellsRow: FunctionComponent<Props> = ({
  wallsRow,
  cellsRow,
  moveCell,
  moveWall,
}) => {
  const buildWall = (wall: IWall): JSX.Element => (
    <Wall position={WallPosition.VERTICAL} wall={wall} moveWall={moveWall} />
  );

  const elements = range(cellsRow.length).map((x) => (
    <>
      {buildWall(wallsRow[x])}
      <Cell cell={cellsRow[x]} moveCell={moveCell} />
    </>
  ));
  elements.push(buildWall(wallsRow[cellsRow.length]));

  return <Row>{elements}</Row>;
};

export default MazeWallsAndCellsRow;
