import React, { FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';

const MazeEditorContainer: FunctionComponent = ({ children }) => (
  <Container>
    <div className="d-flex justify-content-between my-3">{children}</div>
  </Container>
);

export default MazeEditorContainer;
