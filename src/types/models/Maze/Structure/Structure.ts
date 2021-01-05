import MazeElement from './MazeElement';
import Size from './Size';

export default interface Structure {
  size: Size;
  walls: MazeElement[];
  cells: MazeElement[];
}
