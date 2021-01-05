import React, { FunctionComponent } from 'react';
import Wall, { WallPosition } from '../mazeElements/Wall';
import MoveMazeElement from '../../types/util/dnd/maze/MoveMazeElement';
import MazeElement from '../../types/models/Maze/Structure/MazeElement';
import FlexBox from '../FlexBox';
import { PartialSize } from '../../types/models/Maze/Structure/Size';
import WithDangerZoneIfNeeded from './WithDangerZoneIfNeeded';

interface Props {
  wallsRow: MazeElement[];
  moveWall?: MoveMazeElement;
  restrictedSize?: PartialSize;
}

const MazeWallsRow: FunctionComponent<Props> = ({
  wallsRow,
  moveWall,
  restrictedSize,
}) => (
  <FlexBox>
    {wallsRow.map((_, x) => (
      <WithDangerZoneIfNeeded
        elementNumber={x}
        lastElementNumber={wallsRow.length - 1}
        isRestricted={!!restrictedSize?.width}
      >
        <Wall
          position={WallPosition.HORIZONTAL}
          wall={wallsRow[x]}
          moveWall={moveWall}
        />
      </WithDangerZoneIfNeeded>
    ))}
  </FlexBox>
);

export default MazeWallsRow;
