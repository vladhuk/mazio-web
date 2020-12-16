import React, { ChangeEvent, FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import Size, { PartialSize } from '../../types/models/Maze/Structure/Size';
import BlockedNumberFormControl from '../BlockedNumberFormInput';
import FormContainer from '../FormContainer';

interface Props {
  minSize: Size;
  size: Size;
  setSize(size: Size): void;
  onRestrictedSize?(restrictedSize: PartialSize): void;
}

const MazeResizer: FunctionComponent<Props> = ({
  minSize,
  size,
  setSize,
  onRestrictedSize,
}) => {
  const getInput: (property: keyof Size) => JSX.Element = (property) => (
    <BlockedNumberFormControl
      required
      value={size[property]}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);

        if (newValue < minSize[property]) {
          onRestrictedSize?.({ [property]: newValue });
        } else {
          setSize({ ...size, [property]: newValue });
        }
      }}
    />
  );

  return (
    <FormContainer>
      <h4>Size</h4>
      <Row className="justify-content-center align-items-center">
        <Col md={4}>{getInput('width')}</Col>
        <div className="font-weight-bolder">✕</div>
        <Col md={4}>{getInput('height')}</Col>
      </Row>
    </FormContainer>
  );
};

export default MazeResizer;
