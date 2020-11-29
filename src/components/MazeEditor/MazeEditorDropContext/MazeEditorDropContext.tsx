import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import { MazeDragElement } from '../../../types/util/dnd/maze';
import { MazeElement } from '../../../types/models/Maze/Structure';
import { buildMazeEditorDropContextOptions } from './MazeEditorDropContext.service';

interface Props {
  removeElementFromMaze(element: MazeElement): void;
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
