import React, { FunctionComponent, useRef } from 'react';

interface Props {
  className?: string;
}

/**
 * Makes height the same as width
 */
const SquareContainer: FunctionComponent<Props> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  if (ref.current) {
    ref.current.style.height = `${ref.current.offsetWidth}px`;
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default SquareContainer;
