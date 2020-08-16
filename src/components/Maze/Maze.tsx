/* eslint-disable react/no-array-index-key */

import React, { FunctionComponent } from 'react';
import { Row, Container } from 'react-bootstrap';
import Cell from './Cell';
import Wall from './Wall';
import { WallPosition } from './Wall/Wall';
import Structure, { WallType } from '../../types/models/Maze/Structure';

type Props = Structure;

const Maze: FunctionComponent<Props> = ({ size, walls, cells }: Props) => {
  const horizontalArr = Array(size.height).fill(null);
  const verticalArr = Array(size.width).fill(null);

  return (
    <Container className="maze">
      <Row>
        {horizontalArr.map(() => {
          return (
            <Wall position={WallPosition.HORIZONTAL} type={WallType.EXTERNAL} />
          );
        })}
      </Row>
      {verticalArr.map(() => {
        return (
          <>
            <Row>
              <Wall position={WallPosition.VERTICAL} type={WallType.OUTPUT} />
              {horizontalArr.map(() => {
                return (
                  <>
                    <Cell />
                    <Wall
                      position={WallPosition.VERTICAL}
                      type={WallType.RUBBER}
                    />
                  </>
                );
              })}
            </Row>
            <Row>
              {horizontalArr.map(() => {
                return (
                  <Wall
                    position={WallPosition.HORIZONTAL}
                    type={WallType.TRANSLUCENT}
                  />
                );
              })}
            </Row>
          </>
        );
      })}
    </Container>
  );
};

export default Maze;
