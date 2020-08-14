import Location from './Location';

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

export default interface Cell {
  location: Location;
  ref?: Location;
  type: CellType;
}
