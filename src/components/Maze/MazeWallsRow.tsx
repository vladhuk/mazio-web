import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { MazeElement, Wall as IWall } from '../../types/models/Maze/Structure';
import Wall, { WallPosition } from '../mazeElements/Wall';

interface Props {
  wallsRow: IWall[];
  moveWall(source: MazeElement, target: MazeElement): void;
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
