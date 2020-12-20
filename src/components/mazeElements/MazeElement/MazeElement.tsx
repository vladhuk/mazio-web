import keyboard, { getCode } from 'keyboard-key';
import React, { forwardRef, useState } from 'react';
import './MazeElement.scss';

interface Props {
  danger?: boolean;
  className?: string;
}

const MazeElement = forwardRef<HTMLDivElement, Props>(
  ({ danger, className }, ref) => {
    const [isFocus, setFocus] = useState(false);

    const dangerClassName = danger ? 'danger' : '';
    const elementClassName = `maze-element ${dangerClassName} ${className}`;

    const blurElement = (eventTarget: EventTarget) =>
      (eventTarget as HTMLDivElement).blur();

    return (
      <div
        ref={ref}
        tabIndex={0}
        className={elementClassName}
        onFocus={() => setTimeout(() => setFocus(true), 200)}
        onBlur={() => setFocus(false)}
        onClick={(event) => isFocus && blurElement(event.target)}
        onKeyDown={(event) =>
          getCode(event) === keyboard.Escape && blurElement(event.target)
        }
      />
    );
  }
);

export default MazeElement;
