import React, { ChangeEvent, FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import Size from '../../types/models/Maze/Structure/Size';
import BlockedNumberFormControl from '../BlockedNumberFormInput';
import FormContainer from '../FormContainer';

interface Props {
  minSize: Size;
  size: Size;
  setSize(size: Size): void;
}

const MazeResizer: FunctionComponent<Props> = ({
  minSize,
  size: { width, height },
  setSize,
}) => (
  <FormContainer>
    <h4>Size</h4>
    <Row className="justify-content-center align-items-center">
      <Col md={4}>
        <BlockedNumberFormControl
          min={minSize.width}
          required
          value={width}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSize({
              width: parseInt(event.target.value, 10),
              height,
            })
          }
        />
      </Col>
      <div className="font-weight-bolder">✕</div>
      <Col md={4}>
        <BlockedNumberFormControl
          min={minSize.height}
          required
          value={height}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSize({
              width,
              height: parseInt(event.target.value, 10),
            })
          }
        />
      </Col>
    </Row>
  </FormContainer>
);

export default MazeResizer;
