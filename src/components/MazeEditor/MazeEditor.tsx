import React, { FunctionComponent, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import Maze from '../Maze';
import MazeElementsMenu from '../MazeElementsMenu';
import MazeEditorContainer from './MazeEditorContainer';
import MazeDropContextAndDragLayer from './MazeDropContextAndDragLayer';
import MazeEditorDropContext from './MazeEditorDropContext';
import Cell, { CellType } from '../../types/models/Maze/Structure/Cell';
import Wall, { WallType } from '../../types/models/Maze/Structure/Wall';
import {
  buildWalls,
  buildCells,
  bindMoveOrAddMazeElement,
  bindRemoveMazeElement,
  getMazeMinSize,
  simplifyWallsData,
  simplifyCellsData,
  fixWallsOnResizing,
} from './MazeEditor.service';
import Size, { PartialSize } from '../../types/models/Maze/Structure/Size';
import { menuCellTypes, menuWallTypes } from './menuMazeElementsTypes';
import MazeResizer from '../MazeResizer';
import FormContainersWrapper from '../FormContainersWrapper';

const demoWalls: Wall[] = [
  { location: { x: 3, y: 14 }, type: WallType.OUTPUT },
  { location: { x: 3, y: 0 }, type: WallType.OUTPUT },
  { location: { x: 0, y: 7 }, type: WallType.OUTPUT },
  { location: { x: 7, y: 7 }, type: WallType.OUTPUT },
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

const defaultMazeSize: Size = { height: 7, width: 7 };

const MazeEditor: FunctionComponent = () => {
  const [mazeMinSize, setMazeMinSize] = useState<Size>(
    getMazeMinSize(demoWalls, demoCells, defaultMazeSize)
  );
  const [mazeSize, setMazeSize] = useState<Size>(defaultMazeSize);
  const [wallsRows, setWallsRows] = useState(
    buildWalls(defaultMazeSize, demoWalls)
  );
  const [cellsRows, setCellsRows] = useState(
    buildCells(defaultMazeSize, demoCells)
  );
  const [restrictedSize, setRestrictedSize] = useState<PartialSize>({});

  useEffect(() => {
    const minSize = getMazeMinSize(
      simplifyWallsData(wallsRows),
      simplifyCellsData(cellsRows),
      mazeSize
    );
    setMazeMinSize(minSize);
  }, [cellsRows, mazeSize, wallsRows]);

  const setMazeSizeAndUpdateMaze = (newSize: Size) => {
    const simplifiedWalls = simplifyWallsData(wallsRows);
    const fixedWalls = fixWallsOnResizing(simplifiedWalls, mazeSize, newSize);

    setWallsRows(buildWalls(newSize, fixedWalls));
    setCellsRows(buildCells(newSize, simplifyCellsData(cellsRows)));

    setMazeSize(newSize);
  };

  const onRestrictedSize = (newRestrictedSize: PartialSize) => {
    setRestrictedSize(newRestrictedSize);
    setTimeout(() => setRestrictedSize({}), 300);
  };

  const moveWall = bindMoveOrAddMazeElement(wallsRows, setWallsRows);
  const moveCell = bindMoveOrAddMazeElement(cellsRows, setCellsRows);

  const removeWall = bindRemoveMazeElement(wallsRows, setWallsRows);
  const removeCell = bindRemoveMazeElement(cellsRows, setCellsRows);

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <MazeEditorDropContext removeWall={removeWall} removeCell={removeCell}>
        <MazeEditorContainer>
          <MazeDropContextAndDragLayer>
            <Maze
              wallsRows={wallsRows}
              cellsRows={cellsRows}
              moveWall={moveWall}
              moveCell={moveCell}
              restrictedSize={restrictedSize}
            />
          </MazeDropContextAndDragLayer>
          <FormContainersWrapper md={4}>
            <MazeResizer
              minSize={mazeMinSize}
              size={mazeSize}
              setSize={setMazeSizeAndUpdateMaze}
              onRestrictedSize={onRestrictedSize}
            />
            <MazeElementsMenu
              cellTypes={menuCellTypes}
              wallTypes={menuWallTypes}
            />
          </FormContainersWrapper>
        </MazeEditorContainer>
      </MazeEditorDropContext>
    </DndProvider>
  );
};

export default MazeEditor;
