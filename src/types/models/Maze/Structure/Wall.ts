import MazeElement, { MazeElementType } from './MazeElement';

enum WallBaseType {
  STONE = 'STONE',
  RUBBER = 'RUBBER',
  TRANSLUCENT = 'TRANSLUCENT',
  OUTPUT = 'OUTPUT',

  /* Does not exist in server model */
  EXTERNAL = 'EXTERNAL',
}

export const WallType = { ...WallBaseType, ...MazeElementType };
export type WallType = WallBaseType | MazeElementType;

export default interface Wall extends MazeElement {
  type: WallType;
}
