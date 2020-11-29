import MazeElement from './MazeElement';

export enum WallType {
  STONE = 'STONE',
  RUBBER = 'RUBBER',
  TRANSLUCENT = 'TRANSLUCENT',
  OUTPUT = 'OUTPUT',

  /* Does not exist in server model */
  NONE = 'NONE',
  EXTERNAL = 'EXTERNAL',
}

export default interface Wall extends MazeElement {
  type: WallType;
}
