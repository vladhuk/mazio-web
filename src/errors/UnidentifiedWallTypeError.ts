export default class UnidentifiedWallTypeError extends Error {
  constructor(wallType: string) {
    super(`Wall type: ${wallType}`);
  }
}
