import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { WallType, CellType } from '../../types/models/Maze/Structure';
import Wall, { WallPosition } from './Wall';
import Cell from './Cell';

interface Props {
  wallTypes: WallType[];
  cellTypes: CellType[];
}

const MazeWallsAndCellsRow: FunctionComponent<Props> = ({
  wallTypes,
  cellTypes,
}: Props) => {
  const elements = [];

  for (let x = 0; x < cellTypes.length; x += 1) {
    elements.push(
      <Wall position={WallPosition.VERTICAL} type={wallTypes[x]} />
    );
    elements.push(<Cell type={cellTypes[x]} />);
  }

  elements.push(
    <Wall position={WallPosition.VERTICAL} type={wallTypes[cellTypes.length]} />
  );

  return <Row>{elements}</Row>;
};

export default MazeWallsAndCellsRow;
