import React, { FunctionComponent } from 'react';

interface Props {
  className?: string;
}

const FlexBox: FunctionComponent<Props> = ({ className, children }) => (
  <div className={`d-flex ${className || ''}`}>{children}</div>
);

export default FlexBox;
