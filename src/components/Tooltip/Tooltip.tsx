import * as React from 'react';
import { FunctionComponent } from 'react';
import { OverlayTrigger, Tooltip as BSTooltip } from 'react-bootstrap';

interface Props {
  text: string;
  children: JSX.Element;
}

const Tooltip: FunctionComponent<Props> = ({ text, children }) => (
  <OverlayTrigger
    overlay={<BSTooltip id={`tooltip-${text}`}>{text}</BSTooltip>}
    delay={{ show: 400, hide: 0 }}
  >
    <div>{children}</div>
  </OverlayTrigger>
);

export default Tooltip;
