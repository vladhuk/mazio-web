import React, { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';

import './FormContainersWrapper.scss';

interface Props {
  md?: number;
}

const FormContainersWrapper: FunctionComponent<Props> = ({ md, children }) => (
  <Col md={md} className="form-containers-wrapper">
    {children}
  </Col>
);

export default FormContainersWrapper;
