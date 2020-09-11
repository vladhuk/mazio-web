import * as React from 'react';
import { FunctionComponent } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
  text: string;
  children: JSX.Element;
}

const DefaultTooltip: FunctionComponent<Props> = ({ text, children }) => (
  <OverlayTrigger
    overlay={<Tooltip id={`tooltip-${text}`}>{text}</Tooltip>}
    delay={{ show: 400, hide: 0 }}
  >
    <div>{children}</div>
  </OverlayTrigger>
);

export default DefaultTooltip;
