import { XYCoord } from 'react-dnd/lib/interfaces/monitors';

// eslint-disable-next-line import/prefer-default-export
export function getItemStyles(
  currentOffset: XYCoord | null
): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
  };
}
