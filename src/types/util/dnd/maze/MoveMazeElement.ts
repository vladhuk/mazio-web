import MazeElement from '../../../models/Maze/Structure/MazeElement';

type MoveMazeElement = <T extends MazeElement>(source: T, target: T) => void;

export default MoveMazeElement;
