import React, { FunctionComponent, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Maze from '../Maze';
import MazeElementsMenu from '../MazeElementsMenu';
import MazeEditorContainer from './MazeEditorContainer';
import MazeDropContextAndDragLayer from './MazeDropContextAndDragLayer';
import MazeEditorDropContext from './MazeEditorDropContext/MazeEditorDropContext';
import Cell, { CellType } from '../../types/models/Maze/Structure/Cell';
import Wall, { WallType } from '../../types/models/Maze/Structure/Wall';
import {
  buildWalls,
  buildCells,
  bindMoveOrAddMazeElement,
  bindRemoveMazeElement,
} from './MazeEditor.service';
import Size from '../../types/models/Maze/Structure/Size';
import { menuCellTypes, menuWallTypes } from './menuMazeElementsTypes';

const demoWalls: Wall[] = [
  { location: { x: 4, y: 0 }, type: WallType.OUTPUT },
  { location: { x: 3, y: 3 }, type: WallType.STONE },
  { location: { x: 3, y: 4 }, type: WallType.RUBBER },
  { location: { x: 3, y: 5 }, type: WallType.TRANSLUCENT },
];

const demoCells: Cell[] = [
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

const mazeSize: Size = { height: 7, width: 7 };

const MazeEditor: FunctionComponent = () => {
  const [wallsRows, setWallsRows] = useState(buildWalls(mazeSize, demoWalls));
  const [cellsRows, setCellsRows] = useState(buildCells(mazeSize, demoCells));

  const moveWall = bindMoveOrAddMazeElement(wallsRows, setWallsRows);
  const moveCell = bindMoveOrAddMazeElement(cellsRows, setCellsRows);

  const removeWall = bindRemoveMazeElement(wallsRows, setWallsRows);
  const removeCell = bindRemoveMazeElement(cellsRows, setCellsRows);

  return (
    <DndProvider backend={HTML5Backend}>
      <MazeEditorDropContext removeWall={removeWall} removeCell={removeCell}>
        <MazeEditorContainer>
          <MazeDropContextAndDragLayer>
            <Maze
              wallsRows={wallsRows}
              cellsRows={cellsRows}
              moveWall={moveWall}
              moveCell={moveCell}
            />
          </MazeDropContextAndDragLayer>
          <MazeElementsMenu
            cellTypes={menuCellTypes}
            wallTypes={menuWallTypes}
          />
        </MazeEditorContainer>
      </MazeEditorDropContext>
    </DndProvider>
  );
};

export default MazeEditor;
