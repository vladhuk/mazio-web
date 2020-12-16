import React, { FunctionComponent } from 'react';

import './DangerZone.scss';

interface Props {
  disabled?: boolean;
}

const DangerZone: FunctionComponent<Props> = ({ disabled, children }) => {
  const colorClassName = disabled ? '' : 'danger-zone-enabled';
  const className = `danger-zone ${colorClassName}`;

  return <div className={className}>{children}</div>;
};

export default DangerZone;
