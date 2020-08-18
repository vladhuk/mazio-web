import React, { FunctionComponent } from 'react';
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

  return <Maze size={{ height: 5, width: 5 }} walls={walls} cells={cells} />;
};

export default App;
