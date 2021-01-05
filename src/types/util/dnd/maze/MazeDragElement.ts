import { DragObjectWithType } from 'react-dnd';
import ElementLocation from '../../../models/Maze/Structure/ElementLocation';
import { IMazeElementType } from '../../../models/Maze/Structure/MazeElement';

export enum MazeDragItemType {
  CELL = 'CELL',
  WALL = 'WALL',
}

export default interface MazeDragElement extends DragObjectWithType {
  type: MazeDragItemType;
  elementType: IMazeElementType;
  location: ElementLocation;
  className: string;
}
