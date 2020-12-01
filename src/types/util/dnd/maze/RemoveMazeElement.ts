import MazeElement from '../../../models/Maze/Structure/MazeElement';

type RemoveMazeElement = <T extends MazeElement>(element: T) => void;

export default RemoveMazeElement;
