import React from 'react';
import NetworkCard from './cards/NetworkCard';
function NetworkList({
  title,
  networks,
  theme = 'secondary',
}) {
  return (
    <div className={`network-container theme-${theme}`}>
      <div className="network-container__header">{title}</div>
      <div className="network-container__body">
        {networks.map((network) => (
          <NetworkCard {...network} />
        ))}
      </div>
    </div>
  );
}

export default NetworkList;
