import { range, times, constant, concat, cloneDeep } from 'lodash';
import {
  Wall,
  WallType,
  Size,
  Cell,
  CellType,
  Location,
} from '../../types/models/Maze/Structure';

function buildWallsPreset(mazeSize: Size): WallType[][] {
  const wallsRowsQuantity = mazeSize.height * 2 + 1;

  const walls: WallType[][] = range(wallsRowsQuantity - 2).map((i) => {
    const offset = i % 2 === 0 ? 1 : 0;
    const row = times(mazeSize.width - offset, constant(WallType.NONE));

    return offset ? concat(WallType.EXTERNAL, row, WallType.EXTERNAL) : row;
  });

  const getMazeBorderRow = () =>
    times(mazeSize.width, constant(WallType.EXTERNAL));

  return [getMazeBorderRow(), ...walls, getMazeBorderRow()];
}

export function buildWalls(mazeSize: Size, walls: Wall[]): WallType[][] {
  const preset = buildWallsPreset(mazeSize);

  walls.forEach((wall) => {
    const { x, y } = wall.location;
    preset[y][x] = wall.type;
  });

  return preset;
}

function buildCellsPreset(mazeSize: Size): CellType[][] {
  return times(mazeSize.height, () =>
    times(mazeSize.width, constant(CellType.NONE))
  );
}

export function buildCells(mazeSize: Size, cells: Cell[]): CellType[][] {
  const preset = buildCellsPreset(mazeSize);

  cells.forEach((cell) => {
    const { x, y } = cell.location;
    preset[y][x] = cell.type;
  });

  return preset;
}

export function swapElementsInMaze<T>(
  elements: T[][],
  loc1: Location,
  loc2: Location
): T[][] {
  const newRows = cloneDeep(elements);
  newRows[loc1.y][loc1.x] = elements[loc2.y][loc2.x];
  newRows[loc2.y][loc2.x] = elements[loc1.y][loc1.x];
  return newRows;
}
