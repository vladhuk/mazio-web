import React, { FunctionComponent } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Maze from '../Maze';
import {
  Wall,
  WallType,
  Cell,
  CellType,
} from '../../types/models/Maze/Structure';

const App: FunctionComponent = () => {
  const walls: Wall[] = [
    { location: { x: 4, y: 0 }, type: WallType.OUTPUT },
    { location: { x: 4, y: 5 }, type: WallType.OUTPUT },
    { location: { x: 3, y: 3 }, type: WallType.STONE },
  ];

  const cells: Cell[] = [{ location: { x: 3, y: 0 }, type: CellType.HOSPITAL }];

  return (
    <DndProvider backend={HTML5Backend}>
      <Maze size={{ height: 5, width: 5 }} walls={walls} cells={cells} />
    </DndProvider>
  );
};

export default App;
