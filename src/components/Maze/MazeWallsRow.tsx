import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { WallType } from '../../types/models/Maze/Structure';
import Wall, { WallPosition } from './Wall';

interface Props {
  wallTypes: WallType[];
}

const MazeWallsRow: FunctionComponent<Props> = ({ wallTypes }: Props) => {
  return (
    <Row>
      {wallTypes.map((wallType, x) => (
        <Wall position={WallPosition.HORIZONTAL} type={wallTypes[x]} />
      ))}
    </Row>
  );
};

export default MazeWallsRow;
