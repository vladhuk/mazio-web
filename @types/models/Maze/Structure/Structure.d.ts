import Size from './Size';
import Wall from './Wall';
import Cell from './Cell';

export default interface Structure {
  size: Size;
  walls: Wall[];
  cells: Cell[];
}
