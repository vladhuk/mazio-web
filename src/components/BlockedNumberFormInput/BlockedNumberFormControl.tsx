import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { blockKeyboardExceptArrowsUpAndDown } from './BlockedNumberFormControl.service';

import './BlockedNumberFormControl.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & FormControlProps;

const BlockedNumberFormControl: FunctionComponent<Props> = ({
  className,
  ...rest
}) => (
  <Form.Control
    {...rest}
    className={`hidden-caret ${className}`}
    type="number"
    onKeyDown={blockKeyboardExceptArrowsUpAndDown}
  />
);

export default BlockedNumberFormControl;
