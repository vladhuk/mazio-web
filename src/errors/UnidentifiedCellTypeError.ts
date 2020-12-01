export default class UnidentifiedCellTypeError extends Error {
  constructor(cellType: string) {
    super(`Cell type: ${cellType}`);
  }
}
