import React from 'react';
import NetworkCard from '../components/cards/NetworkCard';
import NetworkList from '../components/NetworkList';

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
      <div className="network-grid container">
        <div className="row">
          <NetworkList title={'title'} networks={Array(6).fill(NETWORK)} />
          <NetworkList
            title={'title'}
            theme="blue"
            networks={Array(2).fill(NETWORK)}
          />
          <NetworkList
            title={'title'}
            theme="gray"
            networks={Array(3).fill(NETWORK)}
          />
        </div>
        <div className="row">
          <NetworkList
            title={'title'}
            theme="dark"
            networks={Array(3).fill(NETWORK)}
          />

          <NetworkList
            title={'title'}
            theme="primary"
            networks={Array(1).fill(NETWORK)}
          />
        </div>
      </div>
    </section>
  );
}

export default NetworkHall;
