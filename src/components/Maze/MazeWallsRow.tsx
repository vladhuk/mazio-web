import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { Wall as IWall, Location } from '../../types/models/Maze/Structure';
import Wall, { WallPosition } from '../MazeElements/Wall';

interface Props {
  wallsRow: IWall[];
  moveWall(source: Location, target: Location): void;
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
