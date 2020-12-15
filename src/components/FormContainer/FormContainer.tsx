import React, { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';

interface Props {
  md?: number;
}

const FormContainer: FunctionComponent<Props> = ({ md, children }) => (
  <Col md={md} className="p-3 border rounded bg-light">
    {children}
  </Col>
);

export default FormContainer;
