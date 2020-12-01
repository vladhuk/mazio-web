export default class UnidentifiedItemTypeError extends Error {
  constructor(itemType: string) {
    super(`Item type: ${itemType}`);
  }
}
