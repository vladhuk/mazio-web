import React, { FunctionComponent } from 'react';
import { flatten, range } from 'lodash';
import MazeWallsRow from './MazeWallsRow';
import MazeWallsAndCellsRow from './MazeWallsAndCellsRow';
import MoveMazeElement from '../../types/util/dnd/maze/MoveMazeElement';
import Cell from '../../types/models/Maze/Structure/Cell';
import Wall from '../../types/models/Maze/Structure/Wall';
import { PartialSize } from '../../types/models/Maze/Structure/Size';
import WithDangerZoneIfNeeded from './WithDangerZoneIfNeeded';

interface Props {
  cellsRows: Cell[][];
  wallsRows: Wall[][];
  moveCell?: MoveMazeElement;
  moveWall?: MoveMazeElement;
  restrictedSize?: PartialSize;
}

const Maze: FunctionComponent<Props> = ({
  wallsRows,
  cellsRows,
  moveCell,
  moveWall,
  restrictedSize,
}) => {
  const buildWallsRow = (wallsRow: Wall[]) => (
    <MazeWallsRow
      wallsRow={wallsRow}
      moveWall={moveWall}
      restrictedSize={restrictedSize}
    />
  );

  const buildRow = (y: number) => [
    buildWallsRow(wallsRows[y * 2]),
    <MazeWallsAndCellsRow
      wallsRow={wallsRows[y * 2 + 1]}
      cellsRow={cellsRows[y]}
      moveCell={moveCell}
      moveWall={moveWall}
      restrictedSize={restrictedSize}
    />,
  ];

  const withDangerZoneIfNeeded = (y: number, component: JSX.Element) => (
    <WithDangerZoneIfNeeded
      elementNumber={y}
      lastElementNumber={cellsRows.length - 1}
      isRestricted={!!restrictedSize?.height}
    >
      {component}
    </WithDangerZoneIfNeeded>
  );

  const rows = range(cellsRows.length).map((y) =>
    buildRow(y).map((component) => withDangerZoneIfNeeded(y, component))
  );

  return (
    <div className="maze">
      {flatten(rows)}
      {buildWallsRow(wallsRows[wallsRows.length - 1])}
    </div>
  );
};

export default Maze;
