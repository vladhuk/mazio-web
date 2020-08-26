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
    { location: { x: 3, y: 3 }, type: WallType.STONE },
    { location: { x: 3, y: 4 }, type: WallType.RUBBER },
    { location: { x: 3, y: 5 }, type: WallType.TRANSLUCENT },
  ];

  const cells: Cell[] = [
    { location: { x: 0, y: 0 }, type: CellType.SPAWN },
    { location: { x: 1, y: 0 }, type: CellType.TREASURE },
    { location: { x: 2, y: 0 }, type: CellType.FAKE_TREASURE },
    { location: { x: 3, y: 0 }, type: CellType.HOSPITAL },
    { location: { x: 4, y: 0 }, type: CellType.ARSENAL },
    { location: { x: 5, y: 0 }, type: CellType.RIVER_START },
    { location: { x: 6, y: 0 }, type: CellType.RIVER },
    { location: { x: 0, y: 1 }, type: CellType.RIVER_END },
    { location: { x: 1, y: 1 }, type: CellType.TRAP },
    { location: { x: 2, y: 1 }, type: CellType.PIT_IN },
    { location: { x: 3, y: 1 }, type: CellType.PIT_OUT },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Maze size={{ height: 7, width: 7 }} walls={walls} cells={cells} />
    </DndProvider>
  );
};

export default App;
