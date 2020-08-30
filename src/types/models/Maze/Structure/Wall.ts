import { MazeElement } from '.';

export enum WallType {
  STONE = 'STONE',
  RUBBER = 'RUBBER',
  TRANSLUCENT = 'TRANSLUCENT',
  OUTPUT = 'OUTPUT',

  /* Does not exist in server model */
  NONE = 'NONE',
  EXTERNAL = 'EXTERNAL',
}

export interface Wall extends MazeElement {
  type: WallType;
}
