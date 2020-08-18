import React, { FunctionComponent } from 'react';
import './Cell.scss';
import { CellType } from '../../../types/models/Maze/Structure';

interface Props {
  type: CellType;
}

const Cell: FunctionComponent<Props> = ({ type }: Props) => {
  return <button type="button" className="cell" aria-label="cell" />;
};

export default Cell;
