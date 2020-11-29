import { DragObjectWithType } from 'react-dnd';
import { Location } from '../../../models/Maze/Structure/Location';

export interface MazeDragElement extends DragObjectWithType {
  elementType: string;
  location: Location;
  className: string;
}
