import React, { FunctionComponent } from 'react';

const ElementsContainer: FunctionComponent = ({ children }) => (
  <div className="d-flex flex-wrap justify-content-center">{children}</div>
);

export default ElementsContainer;
