import ElementLocation from './ElementLocation';
import MazeElement from './MazeElement';

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

  /* Does not exist in server model */
  NONE = 'NONE',
}

export default interface Cell extends MazeElement {
  type: CellType;
  ref?: ElementLocation;
}
