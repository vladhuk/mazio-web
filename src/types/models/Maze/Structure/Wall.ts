import { Location } from './Location';

export enum WallType {
  STONE = 'STONE',
  RUBBER = 'RUBBER',
  TRANSLUCENT = 'TRANSLUCENT',
  OUTPUT = 'OUTPUT',

  /* Does not exist in server model */
  NONE = 'NONE',
  EXTERNAL = 'EXTERNAL',
}

export interface Wall {
  location: Location;
  type: WallType;
}
