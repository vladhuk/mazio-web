import { cloneDeep, concat, range } from 'lodash';
import Cell, { CellType } from '../../types/models/Maze/Structure/Cell';
import ElementLocation from '../../types/models/Maze/Structure/ElementLocation';
import MazeElement from '../../types/models/Maze/Structure/MazeElement';
import Size from '../../types/models/Maze/Structure/Size';
import Wall, { WallType } from '../../types/models/Maze/Structure/Wall';
import MoveMazeElement from '../../types/util/dnd/maze/MoveMazeElement';

export function buildWalls(mazeSize: Size, walls: Wall[]): Wall[][] {
  const preset = buildWallsPreset(mazeSize);

  walls.forEach((wall) => {
    const { x, y } = wall.location;
    preset[y][x].type = wall.type;
  });

  return preset;
}

/**
 * Builds walls preset with only outside walls
 */
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

export function buildCells(mazeSize: Size, cells: Cell[]): Cell[][] {
  const preset = buildCellsPreset(mazeSize);

  cells.forEach((cell) => {
    const { x, y } = cell.location;
    preset[y][x].type = cell.type;
  });

  return preset;
}

/**
 * Builds preset with emty cells
 */
function buildCellsPreset(mazeSize: Size): Cell[][] {
  return range(mazeSize.height).map((y) =>
    range(mazeSize.width).map((x) => ({
      location: { x, y },
      type: CellType.NONE,
    }))
  );
}

/**
 * Swap elements if both of them inside maze. Copy element to maze if source
 * element outside maze.
 */
export function bindMoveOrAddElement<T extends MazeElement>(
  elementsState: T[][],
  setElementsState: (newState: T[][]) => void
): MoveMazeElement {
  return (source: MazeElement, target: MazeElement) => {
    const newRows =
      source.location.x < 0
        ? addElement(elementsState, source.type, target.location)
        : swapElements(elementsState, source.location, target.location);
    setElementsState(newRows);
  };
}

function addElement<T extends MazeElement>(
  elements: T[][],
  sourceElementType: string,
  targetElementLocation: ElementLocation
): T[][] {
  const newRows = cloneDeep(elements);
  const { x, y } = targetElementLocation;
  newRows[y][x].type = sourceElementType;
  return newRows;
}

function swapElements<T extends MazeElement>(
  elements: T[][],
  loc1: ElementLocation,
  loc2: ElementLocation
): T[][] {
  const newRows = cloneDeep(elements);
  newRows[loc1.y][loc1.x].type = elements[loc2.y][loc2.x].type;
  newRows[loc2.y][loc2.x].type = elements[loc1.y][loc1.x].type;
  return newRows;
}
