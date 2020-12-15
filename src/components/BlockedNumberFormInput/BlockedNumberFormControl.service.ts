import { getCode, ArrowUp, ArrowDown } from 'keyboard-key';

// eslint-disable-next-line import/prefer-default-export
export function blockKeyboardExceptArrowsUpAndDown(event: KeyboardEvent): void {
  const keyCode = getCode(event);

  switch (keyCode) {
    case ArrowUp:
    case ArrowDown:
      return;
    default:
      event.preventDefault();
  }
}
