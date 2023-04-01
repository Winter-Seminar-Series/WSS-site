import React from 'react';
import NetworkCard from '../components/cards/NetworkCard';

const NETWORK = {
  id: 1,
  name: 'Name',
  lastName: 'Lastname',
  position: 'Associate professor',
  image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
  association: 'Oxford University',
};

function NetworkHall() {
  return (
    <section className="pt-4">
      <div className="network-grid">
        <div className="row wide">
          <div className="network-container">
            <NetworkCard {...NETWORK} />
            <NetworkCard {...NETWORK} />
            <NetworkCard {...NETWORK} />
          </div>{' '}
        </div>
        <div className="row">
          <div className="network-container">
            <NetworkCard {...NETWORK} />
            <NetworkCard {...NETWORK} />
            <NetworkCard {...NETWORK} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NetworkHall;
