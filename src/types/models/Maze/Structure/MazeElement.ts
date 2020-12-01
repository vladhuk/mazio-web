import ElementLocation from './ElementLocation';

/**
 * Default settings for maze elements like Cell or Wall
 */

export enum MazeElementType {
  /* Does not exist in server model */
  NONE = 'NONE',
}

export default interface MazeElement {
  location: ElementLocation;
  type: string;
}
