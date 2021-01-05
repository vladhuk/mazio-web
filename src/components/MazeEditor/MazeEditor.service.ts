import { cloneDeep, concat, flatten, maxBy, range } from 'lodash';
import ElementLocation from '../../types/models/Maze/Structure/ElementLocation';
import MazeElement, {
  MazeElementBaseType,
  IMazeElementType,
  WallType,
} from '../../types/models/Maze/Structure/MazeElement';
import Size from '../../types/models/Maze/Structure/Size';
import MoveMazeElement from '../../types/util/dnd/maze/MoveMazeElement';
import RemoveMazeElement from '../../types/util/dnd/maze/RemoveMazeElement';

/**
 * Simplified maze elements data is a data stored in the database. It doesn't
 * containt NONE type of all elements and EXTERNAL type of wall.
 *
 * Built maze elements is always 2-dimensional array.
 */

/**
 * Builds full walls rows from simplified walls data
 */
export function buildWalls(
  mazeSize: Size,
  walls: MazeElement[]
): MazeElement[][] {
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
function buildWallsPreset(mazeSize: Size): MazeElement[][] {
  const wallsRowsQuantity = mazeSize.height * 2 + 1;

  const walls: MazeElement[][] = range(1, wallsRowsQuantity - 1).map((y) => {
    const offset = y % 2 === 0 ? 0 : 1;

    const row = range(mazeSize.width - offset).map((x) => ({
      location: { x: x + offset, y },
      type: MazeElementBaseType.NONE,
    }));

    const getSideWall = (x: number): MazeElement => ({
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

/**
 * Builds full cells rows from simplified cells data
 */
export function buildCells(
  mazeSize: Size,
  cells: MazeElement[]
): MazeElement[][] {
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
function buildCellsPreset(mazeSize: Size): MazeElement[][] {
  return range(mazeSize.height).map((y) =>
    range(mazeSize.width).map((x) => ({
      location: { x, y },
      type: MazeElementBaseType.NONE,
    }))
  );
}

function simplifyMazeElementsData(
  mazeElementsRows: MazeElement[][]
): MazeElement[] {
  return flatten(mazeElementsRows).filter(
    (element) => element.type !== MazeElementBaseType.NONE
  );
}

export function simplifyWallsData(wallsRows: MazeElement[][]): MazeElement[] {
  return simplifyMazeElementsData(wallsRows).filter(
    (wall) => wall.type !== WallType.EXTERNAL
  );
}

export function simplifyCellsData(cellsRows: MazeElement[][]): MazeElement[] {
  return simplifyMazeElementsData(cellsRows);
}

export function getMazeMinSize(
  walls: MazeElement[],
  cells: MazeElement[],
  currentSize: Size
): Size {
  const wallsBorders: [Size[], Size[]] = getWallsBorders(walls, currentSize);
  const cellsBorders: Size[] = getCellsBorders(cells);

  const [rightBorders, bottomBorders] = wallsBorders.map((wallSideBorders) => [
    ...cellsBorders,
    ...wallSideBorders,
  ]);

  return {
    width: maxBy(rightBorders, (b) => b.width)?.width || 1,
    height: maxBy(bottomBorders, (b) => b.height)?.height || 1,
  };
}

/**
 * @returns [rightBorder, bottomBorder]
 */
function getWallsBorders(
  walls: MazeElement[],
  currentMazeSize: Size
): [Size[], Size[]] {
  const { height, width } = currentMazeSize;

  const rightOutputs = walls.filter((wall) => wall.location.x === width);
  const bottomOutputs = walls.filter(
    (wall) => Math.floor(wall.location.y / 2) === height
  );

  const wallsWithoutRightAndBottomOutputs = walls.filter(
    (wall) => !isWallOutputAndLocatedOnBottomOrRight(wall)
  );

  return [
    [...wallsWithoutRightAndBottomOutputs, ...bottomOutputs],
    [...wallsWithoutRightAndBottomOutputs, ...rightOutputs],
  ].map((borderWalls) =>
    borderWalls
      .map((wall) => wall.location)
      .map(({ x, y }) => ({ x, y: Math.floor(y / 2) }))
      .map(mapLocationToSize)
  ) as [Size[], Size[]];
}

function isWallOutputAndLocatedOnBottomOrRight(wall: MazeElement): boolean {
  return (
    wall.type === WallType.OUTPUT && !Object.values(wall.location).includes(0)
  );
}

function getCellsBorders(cells: MazeElement[]): Size[] {
  return cells.map((cell) => cell.location).map(mapLocationToSize);
}

function mapLocationToSize({ x, y }: ElementLocation): Size {
  return { width: x + 1, height: y + 1 };
}

export function fixWallsOnResizing(
  walls: MazeElement[],
  currentSize: Size,
  newSize: Size
): MazeElement[] {
  return fixWallsLocationsOnResizing(walls, currentSize, newSize);
}

/**
 * Move outputs to borders
 */
function fixWallsLocationsOnResizing(
  walls: MazeElement[],
  currentSize: Size,
  newSize: Size
): MazeElement[] {
  return walls.map((wall) => {
    if (!isWallOutputAndLocatedOnBottomOrRight(wall)) {
      return wall;
    }

    const { x, y } = wall.location;
    const newLocation: ElementLocation =
      x === currentSize.width
        ? { x: newSize.width, y }
        : { x, y: newSize.height * 2 };

    return {
      ...wall,
      location: newLocation,
    };
  });
}

/**
 * Swap elements if both of them inside maze. Copy element to maze if source
 * element outside maze.
 */
export function bindMoveOrAddMazeElement(
  elementsState: MazeElement[][],
  setElementsState: (newState: MazeElement[][]) => void
): MoveMazeElement {
  return (source, target) => {
    const newRows =
      source.location.x < 0
        ? addMazeElement(elementsState, source.type, target.location)
        : swapMazeElements(elementsState, source.location, target.location);
    setElementsState(newRows);
  };
}

function addMazeElement(
  elements: MazeElement[][],
  sourceElementType: IMazeElementType,
  targetElementLocation: ElementLocation
): MazeElement[][] {
  const newRows = cloneDeep(elements);
  const { x, y } = targetElementLocation;
  newRows[y][x].type = sourceElementType;
  // newRows[y][x].id = uniqueId();
  return newRows;
}

function swapMazeElements(
  elements: MazeElement[][],
  loc1: ElementLocation,
  loc2: ElementLocation
): MazeElement[][] {
  const newRows = cloneDeep(elements);
  newRows[loc1.y][loc1.x] = { ...elements[loc2.y][loc2.x], location: loc1 };
  newRows[loc2.y][loc2.x] = { ...elements[loc1.y][loc1.x], location: loc2 };
  return newRows;
}

export function bindRemoveMazeElement(
  elementsState: MazeElement[][],
  setElementsState: (newState: MazeElement[][]) => void
): RemoveMazeElement {
  return (element) => {
    if (element.location.x < 0 || element.location.y < 0) {
      return;
    }

    const newRows = cloneDeep(elementsState);
    const newElement = newRows[element.location.y][element.location.x];
    newElement.type = getPlaceholderForRemovedElement(element.type);
    setElementsState(newRows);
  };
}

function getPlaceholderForRemovedElement(
  removedElementType: IMazeElementType
): IMazeElementType {
  if (removedElementType === WallType.OUTPUT) {
    return WallType.EXTERNAL;
  }

  return MazeElementBaseType.NONE;
}
