import React, { FunctionComponent } from 'react';
import './Wall.scss';

export enum WallPosition {
  HORIZONTAL,
  VERTICAL,
}

interface Props {
  position: WallPosition;
}

const Wall: FunctionComponent<Props> = ({ position }: Props) => {
  const positionClassName = `wall-${
    position === WallPosition.HORIZONTAL ? 'h' : 'v'
  }`;

  return (
    <button
      type="button"
      className={`wall ${positionClassName}`}
      aria-label="wall"
    />
  );
};

export default Wall;
