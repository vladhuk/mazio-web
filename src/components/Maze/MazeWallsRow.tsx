import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import Wall, { WallPosition } from '../mazeElements/Wall';
import MoveMazeElement from '../../types/util/dnd/maze/MoveMazeElement';
import IWall from '../../types/models/Maze/Structure/Wall';

interface Props {
  wallsRow: IWall[];
  moveWall?: MoveMazeElement;
}

const MazeWallsRow: FunctionComponent<Props> = ({ wallsRow, moveWall }) => {
  return (
    <Row>
      {wallsRow.map((wall, x) => (
        <Wall
          position={WallPosition.HORIZONTAL}
          wall={wallsRow[x]}
          moveWall={moveWall}
        />
      ))}
    </Row>
  );
};

export default MazeWallsRow;
