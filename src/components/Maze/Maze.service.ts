import {
  Wall,
  WallType,
  Size,
  Cell,
  CellType,
} from '../../types/models/Maze/Structure';

function buildWallsPreset(mazeSize: Size): WallType[][] {
  const wallsRowsQuantity = mazeSize.height * 2 + 1;

  const walls: WallType[][] = Array(wallsRowsQuantity - 2)
    .fill(null)
    .map((nullVal, i) => {
      const offset = i % 2 === 0 ? 1 : 0;
      const row = Array(mazeSize.width - offset).fill(WallType.NONE);

      if (offset) {
        row.unshift(WallType.EXTERNAL);
        row.push(WallType.EXTERNAL);
      }

      return row;
    });

  walls.unshift(Array(mazeSize.width).fill(WallType.EXTERNAL));
  walls.push(Array(mazeSize.width).fill(WallType.EXTERNAL));

  return walls;
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
  return Array(mazeSize.height)
    .fill(null)
    .map(() => Array(mazeSize.width).fill(CellType.NONE));
}

export function buildCells(mazeSize: Size, cells: Cell[]): CellType[][] {
  const preset = buildCellsPreset(mazeSize);

  cells.forEach((cell) => {
    const { x, y } = cell.location;
    preset[y][x] = cell.type;
  });

  return preset;
}
