import Cell from './Cell';
import Size from './Size';
import Wall from './Wall';

export default interface Structure {
  size: Size;
  walls: Wall[];
  cells: Cell[];
}
