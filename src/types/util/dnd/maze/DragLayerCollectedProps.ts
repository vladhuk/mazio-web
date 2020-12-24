import { XYCoord } from 'react-dnd';
import MazeDragElement from './MazeDragElement';

export default interface MazeDragLayerCollectedProps {
  isDragging: boolean;
  item: MazeDragElement;
  currentOffset: XYCoord | null;
  offsetDiff: XYCoord | null;
}
