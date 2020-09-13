import { XYCoord } from 'react-dnd';

export default interface DragLayerCollectedProps<Item> {
  isDragging: boolean;
  item: Item;
  currentOffset: XYCoord | null;
}
