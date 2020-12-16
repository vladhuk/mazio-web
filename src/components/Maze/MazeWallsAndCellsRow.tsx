import React, { FunctionComponent } from 'react';
import { range } from 'lodash';
import IWall from '../../types/models/Maze/Structure/Wall';
import ICell from '../../types/models/Maze/Structure/Cell';
import Wall, { WallPosition } from '../mazeElements/Wall';
import Cell from '../mazeElements/Cell';
import MoveMazeElement from '../../types/util/dnd/maze/MoveMazeElement';
import FlexBox from '../FlexBox';
import { PartialSize } from '../../types/models/Maze/Structure/Size';
import WithDangerZoneIfNeeded from './WithDangerZoneIfNeeded';

interface Props {
  wallsRow: IWall[];
  cellsRow: ICell[];
  moveCell?: MoveMazeElement;
  moveWall?: MoveMazeElement;
  restrictedSize?: PartialSize;
}

const MazeWallsAndCellsRow: FunctionComponent<Props> = ({
  wallsRow,
  cellsRow,
  moveCell,
  moveWall,
  restrictedSize,
}) => {
  const buildWall = (wall: IWall): JSX.Element => (
    <Wall position={WallPosition.VERTICAL} wall={wall} moveWall={moveWall} />
  );

  const elements = range(cellsRow.length).map((x) => (
    <WithDangerZoneIfNeeded
      elementNumber={x}
      lastElementNumber={cellsRow.length - 1}
      isRestricted={!!restrictedSize?.width}
    >
      {buildWall(wallsRow[x])}
      <Cell cell={cellsRow[x]} moveCell={moveCell} />
    </WithDangerZoneIfNeeded>
  ));
  elements.push(buildWall(wallsRow[cellsRow.length]));

  return <FlexBox>{elements}</FlexBox>;
};

export default MazeWallsAndCellsRow;
