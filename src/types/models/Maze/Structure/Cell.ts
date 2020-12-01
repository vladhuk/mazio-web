import ElementLocation from './ElementLocation';
import MazeElement, { MazeElementType } from './MazeElement';

enum CellBaseType {
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

export const CellType = { ...CellBaseType, ...MazeElementType };
export type CellType = CellBaseType | MazeElementType;

export default interface Cell extends MazeElement {
  type: CellType;
  ref?: ElementLocation;
}
