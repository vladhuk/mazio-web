import React, { forwardRef, useState } from 'react';
import './MazeElement.scss';

interface Props {
  danger?: boolean;
  className?: string;
}

const MazeElement = forwardRef<HTMLDivElement, Props>(
  ({ danger, className }, ref) => {
    const [isHover, setHover] = useState(false);
    const [isFocus, setFocus] = useState(false);

    const hoverClassName = isHover ? 'hover' : '';
    const dangerClassName = danger ? 'danger' : '';
    const elementClassName = `maze-element ${hoverClassName} ${dangerClassName} ${className}`;

    const blurElement = (eventTarget: EventTarget) =>
      (eventTarget as HTMLDivElement).blur();

    return (
      <div
        ref={ref}
        tabIndex={0}
        className={elementClassName}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setTimeout(() => setFocus(true), 200)}
        onBlur={() => setFocus(false)}
        onClick={(event) => isFocus && blurElement(event.target)}
        onKeyDown={(event) =>
          event.key === 'Escape' && blurElement(event.target)
        }
      />
    );
  }
);

export default MazeElement;
