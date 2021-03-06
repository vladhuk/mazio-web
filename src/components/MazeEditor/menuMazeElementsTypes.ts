import {
  CellType,
  WallType,
} from '../../types/models/Maze/Structure/MazeElement';

export const menuCellTypes = [
  CellType.SPAWN,
  CellType.ARSENAL,
  CellType.HOSPITAL,
  CellType.TREASURE,
  CellType.FAKE_TREASURE,
  CellType.TRAP,
  CellType.PIT_IN,
  CellType.RIVER_START,
];

export const menuWallTypes = [
  WallType.OUTPUT,
  WallType.STONE,
  WallType.RUBBER,
  WallType.TRANSLUCENT,
];
