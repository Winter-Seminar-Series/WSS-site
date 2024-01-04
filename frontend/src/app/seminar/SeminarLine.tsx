import React from 'react';
import Sample from './assets/Sample.svg';
import SeminarCard from './SeminarCard';
import { Person } from './Seminar';
import Marquee from 'react-fast-marquee';

export default function SeminarLine() {
  const people: Person[] = [
    {
      name: 'John Doe',
      surname: 'Doe',
      linkedin: 'https://www.linkedin.com/in/john-doe/',
      instagram: 'https://www.instagram.com/john-doe/',
      facebook: 'https://www.facebook.com/john-doe/',
      image: Sample.src,
      position: 'PhD, Assistant Professor',
      university: 'University of Waterloo',
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      linkedin: 'https://www.linkedin.com/in/john-doe/',
      instagram: 'https://www.instagram.com/john-doe/',
      facebook: 'https://www.facebook.com/john-doe/',
      image: Sample.src,
      position: 'PhD, Assistant Professor',
      university: 'University of Waterloo',
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      linkedin: 'https://www.linkedin.com/in/john-doe/',
      instagram: 'https://www.instagram.com/john-doe/',
      facebook: 'https://www.facebook.com/john-doe/',
      image: Sample.src,
      position: 'PhD, Assistant Professor',
      university: 'University of Waterloo',
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      linkedin: 'https://www.linkedin.com/in/john-doe/',
      instagram: 'https://www.instagram.com/john-doe/',
      facebook: 'https://www.facebook.com/john-doe/',
      image: Sample.src,
      position: 'PhD, Assistant Professor',
      university: 'University of Waterloo',
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      linkedin: 'https://www.linkedin.com/in/john-doe/',
      instagram: 'https://www.instagram.com/john-doe/',
      facebook: 'https://www.facebook.com/john-doe/',
      image: Sample.src,
      position: 'PhD, Assistant Professor',
      university: 'University of Waterloo',
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      linkedin: 'https://www.linkedin.com/in/john-doe/',
      instagram: 'https://www.instagram.com/john-doe/',
      facebook: 'https://www.facebook.com/john-doe/',
      image: Sample.src,
      position: 'PhD, Assistant Professor',
      university: 'University of Waterloo',
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      linkedin: 'https://www.linkedin.com/in/john-doe/',
      instagram: 'https://www.instagram.com/john-doe/',
      facebook: 'https://www.facebook.com/john-doe/',
      image: Sample.src,
      position: 'PhD, Assistant Professor',
      university: 'University of Waterloo',
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      linkedin: 'https://www.linkedin.com/in/john-doe/',
      instagram: 'https://www.instagram.com/john-doe/',
      facebook: 'https://www.facebook.com/john-doe/',
      image: Sample.src,
      position: 'PhD, Assistant Professor',
      university: 'University of Waterloo',
    },
    // {
    //   name: 'John Doe',
    //   surname: 'Doe',
    //   linkedin: 'https://www.linkedin.com/in/john-doe/',
    //   instagram: 'https://www.instagram.com/john-doe/',
    //   facebook: 'https://www.facebook.com/john-doe/',
    //   image: Sample.src,
    //   position: 'PhD, Assistant Professor',
    //   university: 'University of Waterloo',
    // },
    // {
    //   name: 'John Doe',
    //   surname: 'Doe',
    //   linkedin: 'https://www.linkedin.com/in/john-doe/',
    //   instagram: 'https://www.instagram.com/john-doe/',
    //   facebook: 'https://www.facebook.com/john-doe/',
    //   image: Sample.src,
    //   position: 'PhD, Assistant Professor',
    //   university: 'University of Waterloo',
    // },
  ];

  return (
    <Marquee /*className={'flex flex-wrap items-center justify-center'}*/>
      {people.map((person, index) => (
        <SeminarCard key={index} person={person} />
      ))}
    </Marquee>
  );
}
