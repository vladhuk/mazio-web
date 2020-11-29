import React, { FunctionComponent } from 'react';
import { useDragLayer } from 'react-dnd';
import DragLayerCollectedProps from '../../../types/util/dnd/DragLayerCollectedProps';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import MazeElement from '../MazeElement';
import './MazeElementDragLayer.scss';
import { getItemStyles } from './MazeElementDragLayer.service';

interface Props {
  isOutsideMaze?: boolean;
}

const MazeElementDragLayer: FunctionComponent<Props> = ({ isOutsideMaze }) => {
  const { isDragging, item, currentOffset } = useDragLayer<
    DragLayerCollectedProps<MazeDragElement>
  >((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div
      className="maze-element-drag-layer"
      style={getItemStyles(currentOffset)}
    >
      <MazeElement
        danger={isOutsideMaze && item.location.x >= 0}
        className={item.className}
      />
    </div>
  );
};

export default MazeElementDragLayer;
