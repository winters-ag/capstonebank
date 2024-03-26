import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TriggerExample({children, tooltip}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.tooltip}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip({tooltip:tooltip})}
    > 
    {children}
    </OverlayTrigger>
  );
}

export default TriggerExample;