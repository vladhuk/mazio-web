import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import MazeDragElement from '../../../types/util/dnd/maze/MazeDragElement';
import RemoveMazeElement from '../../../types/util/dnd/maze/RemoveMazeElement';
import { buildMazeEditorDropContextOptions } from './MazeEditorDropContext.service';

interface Props {
  removeElementFromMaze: RemoveMazeElement;
}

const MazeEditorDropContext: FunctionComponent<Props> = ({
  children,
  removeElementFromMaze,
}) => {
  const [, drop] = useDrop<MazeDragElement, unknown, unknown>(
    buildMazeEditorDropContextOptions(removeElementFromMaze)
  );

  return (
    <div ref={drop} className="vh-100">
      {children}
    </div>
  );
};

export default MazeEditorDropContext;
