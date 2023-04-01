import React from 'react';
import NetworkCard from '../components/cards/NetworkCard';

const NETWORK = {
  id: 1,
  name: 'Name',
  lastName: 'Lastname',
  position: 'Associate professor',
  image: 'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg',
  association: 'Oxford University',
};

function NetworkHall() {
  return (
    <section className="pt-4">
      <NetworkCard {...NETWORK} />
    </section>
  );
}

export default NetworkHall;
