/* eslint-disable react/no-array-index-key */

import React, { FunctionComponent } from 'react';
import { Row, Container } from 'react-bootstrap';
import Cell from './Cell';

interface Props {
  size: {
    height: number;
    width: number;
  };
}

const Maze: FunctionComponent<Props> = ({ size }: Props) => {
  return (
    <Container>
      {Array(size.height)
        .fill(null)
        .map((val1, i1) => {
          return (
            <Row key={i1}>
              {Array(size.width)
                .fill(null)
                .map((val2, i2) => {
                  return <Cell key={i2} />;
                })}
            </Row>
          );
        })}
    </Container>
  );
};

export default Maze;
