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

const AI = [
  {
    id: 2,
    name: 'Mehdi',
    lastName: 'Soltanolkotabi',
    position: 'Associate Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'University of Southern California'
  },
  {
    id: 3,
    name: 'Mehrdad',
    lastName: 'Mahdavi',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Pennsylvania State University'
  },
  {
    id: 4,
    name: 'Mohammad Amin',
    lastName: 'Sadeghi',
    position: 'Researcher',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Qatar Computing Research Institute'
  },
  {
    id: 5,
    name: 'Erfan',
    lastName: 'Eshratifar',
    position: 'Research Enginner - phd alumn',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Yahoo - University of Southern California'
  },
  {
    id: 6,
    name: 'Mohammad Hossein',
    lastName: 'Rohban',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Sharif Universoty of Technology'
  },
  {
    id: 7,
    name: 'Mahdi',
    lastName: 'M. Kalayeh',
    position: 'Researcher',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Netflix'
  },
  {
    id: 8,
    name: 'Hamed',
    lastName: 'Rahimian',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Clemson University'
  },
  {
    id: 9,
    name: 'Efstratios',
    lastName: 'Gavves',
    position: 'Associate Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'University of Amesterdam'
  },
  {
    id: 10,
    name: 'Jeff',
    lastName: 'Clune',
    position: 'Associate Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Broad Institute of Harvard and MIT'
  },
  {
    id: 11,
    name: 'Ehsaneddin',
    lastName: 'Asgari',
    position: 'Research Scientist',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'VW Data Lab'
  },
  {
    id: 12,
    name: 'Ahmad',
    lastName: 'Beirami',
    position: 'Research Scientist',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Google Research, MIT'
  }
];

const THEORY = [
  {
    id: 13,
    name: 'Arash',
    lastName: 'Pourdamghani',
    position: 'Researcher',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'TU Berlin'
  },
  {
    id: 14,
    name: 'Soheil',
    lastName: 'Behnezhad',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Northeastern University'
  },
  {
    id: 15,
    name: 'Marjan',
    lastName: 'Sirjani',
    position: 'Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'MDH University Sweden'
  }
];

const INTERDISCIPLINARY = [
  {
    id: 16,
    name: 'Hani',
    lastName: 'Goodarzi',
    position: 'Associate Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'University of California, San Francisco'
  },
  {
    id: 17,
    name: 'Iman',
    lastName: 'Hajirasouliha',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Cornell'
  },
  {
    id: 18,
    name: 'Fatemeh',
    lastName: 'Vafae',
    position: 'Associate Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'University of New South Wales'
  },
  {
    id: 19,
    name: 'Ehsan',
    lastName: 'Adeli',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Stanford University'
  },
  {
    id: 20,
    name: 'Anne',
    lastName: 'Carpenter',
    position: 'Institute Scientist and Imaging Platform Director',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Broad Institute of Harvard and MIT'
  },
  {
    id: 21,
    name: 'Hasti',
    lastName: 'Seifi',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Copenhagen'
  },
  {
    id: 22,
    name: 'Pardis',
    lastName: 'Emami Naeini',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Duke'
  },
];

const SYSTEMS = [
  {
    id: 23,
    name: 'Mohammadamin',
    lastName: 'Ajdari',
    position: 'Senior Researcher',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'HPDS'
  },
  {
    id: 24,
    name: 'MohammadKazem',
    lastName: 'Taram',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Purdue University'
  },
  {
    id: 25,
    name: 'Hossein',
    lastName: 'Esfandiari',
    position: 'Senior Research Scientist',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Google'
  },
  {
    id: 26,
    name: 'Amir',
    lastName: 'Moradi',
    position: 'Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Ruhr-Uni­ver­si­tät Bo­chum'
  },
  {
    id: 27,
    name: 'Reyhaneh',
    lastName: 'Jabbarvand',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Illinoise university'
  },
  {
    id: 28,
    name: 'Ali',
    lastName: 'Jose Mashtizadeh',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Waterloo'
  },
  {
    id: 29,
    name: 'Lorenzo',
    lastName: 'Alvisi',
    position: 'Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'Cornell'
  },
  {
    id: 30,
    name: 'Yiting',
    lastName: 'Xia',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'MPI'
  },
  {
    id: 31,
    name: 'Babak',
    lastName: 'Salimi',
    position: 'Assistant Professor',
    image: process.env.PUBLIC_URL + '/images/icons/avatar.jpg',
    association: 'University of California, San Diego'
  },
];

function NetworkHall() {
  return (
    <section className="pt-4">
      <div className="network-grid container">
        <div className="row">
          <NetworkList title={'AI'} networks={AI} />
          <NetworkList title={'Systems'} theme="primary" networks={SYSTEMS}/>
        </div>
        <div className="row">
          <NetworkList title={'Theory'} theme="blue"  networks={THEORY} />
          <NetworkList title={'Interdisciplinary Areas'} theme="gray" networks={INTERDISCIPLINARY}/>
        </div>
      </div>
    </section>
  );
}

export default NetworkHall;
