import React, { FunctionComponent } from 'react';

const OverflowContainer: FunctionComponent = ({ children }) => (
  <div className="d-flex h-100 overflow-auto border rounded bg-light">
    <div className="d-inline-block m-auto p-3">{children}</div>
  </div>
);

export default OverflowContainer;
