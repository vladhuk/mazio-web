import { IMazeElementType } from '../../../models/Maze/Structure/MazeElement';

type MazeElementMovingValidator = (
  sourceType: IMazeElementType,
  targetType: IMazeElementType
) => boolean;

export default MazeElementMovingValidator;
