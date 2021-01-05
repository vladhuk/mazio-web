import ElementLocation from './ElementLocation';

export enum MazeElementBaseType {
  NONE = 'NONE',
}

export enum CellType {
  ARSENAL = 'ARSENAL',
  HOSPITAL = 'HOSPITAL',
  TREASURE = 'TREASURE',
  FAKE_TREASURE = 'FAKE_TREASURE',
  SPAWN = 'SPAWN',
  RIVER = 'RIVER',
  RIVER_START = 'RIVER_START',
  RIVER_END = 'RIVER_END',
  TRAP = 'TRAP',
  PIT_IN = 'PIT_IN',
  PIT_OUT = 'PIT_OUT',
}

export enum WallType {
  STONE = 'STONE',
  RUBBER = 'RUBBER',
  TRANSLUCENT = 'TRANSLUCENT',
  OUTPUT = 'OUTPUT',

  /* Does not exist in server model */
  EXTERNAL = 'EXTERNAL',
}

export type IMazeElementType = MazeElementBaseType | CellType | WallType;

export default interface MazeElement {
  location: ElementLocation;
  type: IMazeElementType;
  refs?: string[];
}
