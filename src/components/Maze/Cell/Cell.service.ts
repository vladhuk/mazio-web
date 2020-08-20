/* eslint-disable import/prefer-default-export */
import { CellType } from '../../../types/models/Maze/Structure';

export function getCssClassNameFromCellType(type: CellType): string {
  switch (type) {
    case CellType.ARSENAL:
      return 'cell-arsenal';
    case CellType.HOSPITAL:
      return 'cell-hospital';
    case CellType.TREASURE:
      return 'cell-treasure';
    case CellType.FAKE_TREASURE:
      return 'cell-fake-treasure';
    case CellType.SPAWN:
      return 'cell-spawn';
    case CellType.RIVER:
      return 'cell-river';
    case CellType.RIVER_START:
      return 'cell-river-start';
    case CellType.RIVER_END:
      return 'cell-river-end';
    case CellType.TRAP:
      return 'cell-trap';
    case CellType.PIT_IN:
      return 'cell-pit-in';
    case CellType.PIT_OUT:
      return 'cell-pit-out';
    case CellType.NONE:
    default:
      return 'cell-none';
  }
}
