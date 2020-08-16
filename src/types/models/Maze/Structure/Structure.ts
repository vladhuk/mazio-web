import { Size, Wall, Cell } from '.';

export default interface Structure {
  size: Size;
  walls: Wall[];
  cells: Cell[];
}
