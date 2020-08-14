import Location from './Location';

export enum Direction {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export enum WallType {
  DEFAULT = 'DEFAULT',
  RUBBER = 'RUBBER',
  TRANSLUCENT = 'TRANSLUCENT',
  OUTPUT = 'OUTPUT',
}

export default interface IWall {
  location: Location;
  direction: Direction;
  type: WallType;
}
