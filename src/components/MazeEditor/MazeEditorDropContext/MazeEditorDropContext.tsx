import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import UnidentifiedItemTypeError from '../../../errors/UnidentifiedItemTypeError';
import MazeDragElement, {
  MazeDragItemType,
} from '../../../types/util/dnd/maze/MazeDragElement';
import RemoveMazeElement from '../../../types/util/dnd/maze/RemoveMazeElement';
import { buildMazeEditorDropContextOptions } from './MazeEditorDropContext.service';

import './MazeEditorDropContext.scss';

interface Props {
  removeCell?: RemoveMazeElement;
  removeWall?: RemoveMazeElement;
}

const MazeEditorDropContext: FunctionComponent<Props> = ({
  removeCell,
  removeWall,
  children,
}) => {
  const getRemoveElement = (
    itemType: MazeDragItemType
  ): RemoveMazeElement | undefined => {
    switch (itemType) {
      case MazeDragItemType.CELL:
        return removeCell;
      case MazeDragItemType.WALL:
        return removeWall;
      default:
        throw new UnidentifiedItemTypeError(itemType);
    }
  };

  const [, drop] = useDrop<MazeDragElement, unknown, unknown>(
    buildMazeEditorDropContextOptions(getRemoveElement)
  );

  return (
    <div ref={drop} className="maze-editor-drop-context">
      {children}
    </div>
  );
};

export default MazeEditorDropContext;
