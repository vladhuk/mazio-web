import { DragObjectWithType } from 'react-dnd';
import ElementLocation from '../../../models/Maze/Structure/ElementLocation';

export default interface MazeDragElement extends DragObjectWithType {
  elementType: string;
  location: ElementLocation;
  className: string;
}
