import React, { FunctionComponent } from 'react';
import './Cell.scss';
import { CellType } from '../../../types/models/Maze/Structure';
import { getCssClassNameFromCellType } from './Cell.service';

interface Props {
  type: CellType;
}

const Cell: FunctionComponent<Props> = ({ type }: Props) => {
  const cellTypeClassName = getCssClassNameFromCellType(type);

  return (
    <button
      type="button"
      className={`cell ${cellTypeClassName}`}
      aria-label="cell"
    />
  );
};

export default Cell;
