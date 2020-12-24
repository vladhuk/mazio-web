import { XYCoord } from 'react-dnd/lib/interfaces/monitors';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';

export function getItemStyles(currentOffset: XYCoord): React.CSSProperties {
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
  };
}

/**
 * Item can be dragged from maze or from menu
 */
export function isDraggedFromMaze(item: MazeDragElement): boolean {
  return item.location.x >= 0;
}

/**
 * Sometimes 'isDragging' is false when element start dragging, so some functions
 * work wrong. This function checks if dragging offset more than 1px on x or y.
 */
export function validateOffsetDiff(offsetDiff: XYCoord): boolean {
  return Object.values(offsetDiff).some((value) => Math.abs(value) > 1);
}
