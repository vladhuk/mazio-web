import React, { FunctionComponent } from 'react';
import Cell from '../mazeElements/Cell';
import ElementsContainer from './ElementsContainer';
import ElementWrapper from './ElementWrapper';
import Wall, { WallPosition } from '../mazeElements/Wall';
import Tooltip from '../Tooltip';
import FormContainer from '../FormContainer';
import {
  CellType,
  WallType,
} from '../../types/models/Maze/Structure/MazeElement';

interface Props {
  cellTypes: CellType[];
  wallTypes: WallType[];
}

const MazeElementsMenu: FunctionComponent<Props> = ({
  cellTypes,
  wallTypes,
}) => (
  <FormContainer>
    <h4>Cells</h4>
    <ElementsContainer>
      {cellTypes.map((type) => (
        <ElementWrapper key={type}>
          <Tooltip text={type}>
            <Cell cell={{ type, location: { x: -1, y: -1 } }} />
          </Tooltip>
        </ElementWrapper>
      ))}
    </ElementsContainer>
    <hr />
    <h4>Walls</h4>
    <ElementsContainer>
      {wallTypes.map((type) => (
        <ElementWrapper key={type}>
          <Tooltip text={type}>
            <Wall
              wall={{ type, location: { x: -1, y: -1 } }}
              position={WallPosition.HORIZONTAL}
            />
          </Tooltip>
        </ElementWrapper>
      ))}
    </ElementsContainer>
  </FormContainer>
);

export default MazeElementsMenu;
