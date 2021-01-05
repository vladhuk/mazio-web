import UnidentifiedCellTypeError from '../../../errors/UnidentifiedCellTypeError';
import {
  CellType,
  IMazeElementType,
  MazeElementBaseType,
} from '../../../types/models/Maze/Structure/MazeElement';

// eslint-disable-next-line import/prefer-default-export
export function getCssClassNameFromCellType(type: IMazeElementType): string {
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
    case MazeElementBaseType.NONE:
      return 'cell-none';
    default:
      throw new UnidentifiedCellTypeError(type);
  }
}
