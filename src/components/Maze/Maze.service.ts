import {
  Wall,
  WallType,
  Size,
  Cell,
  CellType,
} from '../../types/models/Maze/Structure';

function buildWallsPreset(mazeSize: Size): WallType[][] {
  const wallsRowsQuantity = mazeSize.height + 1;
  const wallsColsQuantity = mazeSize.width + 1;

  const walls: WallType[][] = Array(wallsRowsQuantity - 2).fill(
    Array(wallsColsQuantity).fill(WallType.EXTERNAL)
  );
  walls.forEach((row) => row.fill(WallType.NONE, 1, row.length - 1));
  walls.unshift(Array(wallsColsQuantity).fill(WallType.EXTERNAL));
  walls.push(Array(wallsColsQuantity).fill(WallType.EXTERNAL));

  return walls;
}

export function buildWalls(mazeSize: Size, walls: Wall[]): WallType[][] {
  return buildWallsPreset(mazeSize);
}

function buildCellsPreset(mazeSize: Size): CellType[][] {
  return Array(mazeSize.height).fill(Array(mazeSize.width).fill(CellType.NONE));
}

export function buildCells(mazeSize: Size, cells: Cell[]): CellType[][] {
  return buildCellsPreset(mazeSize);
}
