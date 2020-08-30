import { range, concat, cloneDeep } from 'lodash';
import {
  Wall,
  WallType,
  Size,
  Cell,
  CellType,
  Location,
  MazeElement,
} from '../../types/models/Maze/Structure';

function buildWallsPreset(mazeSize: Size): Wall[][] {
  const wallsRowsQuantity = mazeSize.height * 2 + 1;

  const walls: Wall[][] = range(1, wallsRowsQuantity - 1).map((y) => {
    const offset = y % 2 === 0 ? 0 : 1;

    const row = range(mazeSize.width - offset).map((x) => ({
      location: { x: x + offset, y },
      type: WallType.NONE,
    }));

    const getSideWall = (x: number): Wall => ({
      location: { x, y },
      type: WallType.EXTERNAL,
    });

    return offset
      ? concat(getSideWall(0), row, getSideWall(mazeSize.width - 1 + offset))
      : row;
  });

  const getMazeBorderRow = (y: number) =>
    range(mazeSize.width).map((x) => ({
      location: { x, y },
      type: WallType.EXTERNAL,
    }));

  return [
    getMazeBorderRow(0),
    ...walls,
    getMazeBorderRow(wallsRowsQuantity - 1),
  ];
}

export function buildWalls(mazeSize: Size, walls: Wall[]): Wall[][] {
  const preset = buildWallsPreset(mazeSize);

  walls.forEach((wall) => {
    const { x, y } = wall.location;
    preset[y][x].type = wall.type;
  });

  return preset;
}

function buildCellsPreset(mazeSize: Size): Cell[][] {
  return range(mazeSize.height).map((y) =>
    range(mazeSize.width).map((x) => ({
      location: { x, y },
      type: CellType.NONE,
    }))
  );
}

export function buildCells(mazeSize: Size, cells: Cell[]): Cell[][] {
  const preset = buildCellsPreset(mazeSize);

  cells.forEach((cell) => {
    const { x, y } = cell.location;
    preset[y][x].type = cell.type;
  });

  return preset;
}

export function swapElements<T extends MazeElement>(
  elements: T[][],
  loc1: Location,
  loc2: Location
): T[][] {
  const newRows = cloneDeep(elements);
  newRows[loc1.y][loc1.x].type = elements[loc2.y][loc2.x].type;
  newRows[loc2.y][loc2.x].type = elements[loc1.y][loc1.x].type;
  return newRows;
}

export function bindMoveElement<T extends MazeElement>(
  elementsState: T[][],
  setElementsState: (newState: T[][]) => void
): (source: Location, target: Location) => void {
  return (source: Location, target: Location) => {
    const newRows = swapElements(elementsState, source, target);
    setElementsState(newRows);
  };
}
