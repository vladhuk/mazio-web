import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../../constants';
import UnidentifiedItemTypeError from '../../../errors/UnidentifiedItemTypeError';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import RemoveMazeElement from '../../../types/util/dnd/maze/RemoveMazeElement';
import { buildMazeEditorDropContextOptions } from './MazeEditorDropContext.service';

interface Props {
  removeCell?: RemoveMazeElement;
  removeWall?: RemoveMazeElement;
}

const MazeEditorDropContext: FunctionComponent<Props> = ({
  children,
  removeCell,
  removeWall,
}) => {
  const getRemoveElement = (
    itemType: string
  ): RemoveMazeElement | undefined => {
    switch (itemType) {
      case ItemType.MAZE_CELL:
        return removeCell;
      case ItemType.MAZE_WALL:
        return removeWall;
      default:
        throw new UnidentifiedItemTypeError(itemType);
    }
  };

  const [, drop] = useDrop<MazeDragElement, unknown, unknown>(
    buildMazeEditorDropContextOptions(getRemoveElement)
  );

  return (
    <div ref={drop} className="vh-100">
      {children}
    </div>
  );
};

export default MazeEditorDropContext;
