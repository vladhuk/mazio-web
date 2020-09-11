import React, { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';

const MazeElementsMenuContainer: FunctionComponent = ({ children }) => (
  <Col md={4} className="p-3  h-100 border rounded bg-light">
    {children}
  </Col>
);

export default MazeElementsMenuContainer;
