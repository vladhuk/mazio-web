import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { range } from 'lodash';
import IWall from '../../types/models/Maze/Structure/Wall';
import ICell from '../../types/models/Maze/Structure/Cell';
import Wall, { WallPosition } from '../mazeElements/Wall';
import Cell from '../mazeElements/Cell';
import MoveMazeElement from '../../types/util/dnd/maze/MoveMazeElement';

interface Props {
  wallsRow: IWall[];
  cellsRow: ICell[];
  moveCell?: MoveMazeElement;
  moveWall?: MoveMazeElement;
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
