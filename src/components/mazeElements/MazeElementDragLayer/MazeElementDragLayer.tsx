import React, { FunctionComponent } from 'react';
import { useDragLayer } from 'react-dnd';
import MazeDragLayerCollectedProps from '../../../types/util/dnd/maze/DragLayerCollectedProps';
import MazeElement from '../MazeElement';
import './MazeElementDragLayer.scss';
import {
  getItemStyles,
  isDraggedFromMaze,
  validateOffsetDiff,
} from './MazeElementDragLayer.service';

interface Props {
  isOutsideMaze?: boolean;
}

const MazeElementDragLayer: FunctionComponent<Props> = ({ isOutsideMaze }) => {
  const { isDragging, item, currentOffset, offsetDiff } = useDragLayer<
    MazeDragLayerCollectedProps
  >((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    offsetDiff: monitor.getDifferenceFromInitialOffset(),
  }));

  if (!isDragging || !offsetDiff || !currentOffset) {
    return null;
  }

  return (
    <div
      className="maze-element-drag-layer"
      style={getItemStyles(currentOffset)}
    >
      <MazeElement
        danger={
          isOutsideMaze &&
          isDraggedFromMaze(item) &&
          validateOffsetDiff(offsetDiff)
        }
        className={item.className}
      />
    </div>
  );
};

export default MazeElementDragLayer;
