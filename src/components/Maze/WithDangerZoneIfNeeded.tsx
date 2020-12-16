import React, { FunctionComponent } from 'react';
import DangerZone from '../DangerZone';

interface Props {
  elementNumber: number;
  lastElementNumber: number;
  isRestricted: boolean;
}

const WithDangerZoneIfNeeded: FunctionComponent<Props> = ({
  elementNumber,
  lastElementNumber,
  isRestricted,
  children,
}) =>
  elementNumber === lastElementNumber ? (
    <DangerZone disabled={!isRestricted}>{children}</DangerZone>
  ) : (
    <>{children}</>
  );

export default WithDangerZoneIfNeeded;
