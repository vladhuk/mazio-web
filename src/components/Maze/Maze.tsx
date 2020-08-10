/* eslint-disable react/no-array-index-key */

import React, { FunctionComponent } from 'react';
import { Row, Container } from 'react-bootstrap';
import Cell from './Cell';
import Wall from './Wall';
import { WallPosition } from './Wall/Wall';

interface Props {
  size: {
    height: number;
    width: number;
  };
}

const Maze: FunctionComponent<Props> = ({ size }: Props) => {
  const horizontalArr = Array(size.height).fill(null);
  const verticalArr = Array(size.width).fill(null);

  return (
    <Container className="maze">
      <Row>
        {horizontalArr.map(() => {
          return <Wall position={WallPosition.HORIZONTAL} />;
        })}
      </Row>
      {verticalArr.map(() => {
        return (
          <>
            <Row>
              <Wall position={WallPosition.VERTICAL} />
              {horizontalArr.map(() => {
                return (
                  <>
                    <Cell />
                    <Wall position={WallPosition.VERTICAL} />
                  </>
                );
              })}
            </Row>
            <Row>
              {horizontalArr.map(() => {
                return <Wall position={WallPosition.HORIZONTAL} />;
              })}
            </Row>
          </>
        );
      })}
    </Container>
  );
};

export default Maze;
