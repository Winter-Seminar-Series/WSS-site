import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function Programs({ showButton = true }) {
  return (
    <div className="relative mx-auto overflow-hidden px-6">
      <div
        className="Ellipse absolute right-[-200px] top-[636px] h-72 w-72 rounded-full bg-zinc-400 bg-opacity-30 blur-3xl" />
      <div
        className="Ellipse absolute left-[-200px] top-[205px] h-64 w-64 rounded-full bg-pink-300 bg-opacity-30 blur-3xl" />

      <div className="mx-auto max-w-[993px]">
        <ProgramsArea />
        <ItemsTag />
        {showButton && <Button text="More About WSS" />}
      </div>
    </div>
  );
}

// Set default props
Programs.defaultProps = {
  showButton: true,
};

// Prop types
Programs.propTypes = {
  showButton: PropTypes.bool,
};

const items = [
  {
    id: 1,
    title: 'Seminars',
    overline: 'A two-day journey of discovery and learning',
    img: '/landing/seminars.jpg',
    desc: 'The seminars comprise a two-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.',
  },
  {
    id: 2,
    title: 'Round Tables',
    overline: 'A deep dive into expert-led discussions',
    img: '/landing/roundtables.jpg',
    desc: 'During the event, we host round table discussions on specific topics, inviting experts in the field to share their insights and engage with participants\' concerns. Please note that the round tables are conducted in Persian.',
  },
  {
    id: 3,
    title: 'Poster-Sessions',
    overline: 'Exploring education at the core',
    img: '/landing/posterSession.jpg ',
    desc: 'This section features a series of poster sessions where participants present and discuss their ideas, research findings, or technical projects. These sessions are held in person, providing an interactive platform for knowledge sharing, receiving feedback, and fostering collaboration in various fields of computer science and engineering.',
  },
];

function ProgramsArea() {
  return (
    <div className="mx-auto mb-20 text-center">
      <div className="text-lg font-medium uppercase tracking-wide text-neutral-400">
        Explore the realm of Computer Science
      </div>
      <div className="text-[64px] font-bold text-slate-800">Programs</div>
    </div>
  );
}

function Button({ text }) {
  return (
    <div className="mb-32 mt-20 flex justify-center">
      <Link
        href="/about"
        className="inline-flex h-16 items-center justify-center gap-2.5 gap-x-2.5 rounded-md bg-secondary px-8 text-white hover:bg-secondary-400"
      >
        <span className="text-lg font-bold">{text}</span>
        <Image
          src={'/source/arrow_right_white.svg'}
          alt=""
          width={20}
          height={20}
        />
      </Link>
    </div>
  );
}

function ItemText({ title, overline, description }) {
  return (
    <div className="grow">
      <div className="text-base font-medium uppercase tracking-wide text-neutral-400">
        {overline}
      </div>
      <div className="text-5xl font-bold leading-normal text-slate-800">
        {title}
      </div>
      <div className="mt-2.5 text-justify text-lg leading-relaxed text-neutral-400">
        {description}
      </div>
    </div>
  );
}

function ItemImg({ img }) {
  return (
    <img
      className="aspect-[4 / 3] relative w-full max-w-sm shrink-0 rounded-lg object-cover object-center"
      alt=""
      src={img}
    />
  );
}

function ItemTag({ item }) {
  return (
    <div
      className={`flex flex-col items-center justify-start gap-x-20 gap-y-8 ${
        item.id % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <ItemImg img={item.img} />
      <ItemText
        title={item.title}
        overline={item.overline}
        description={item.desc}
      />
    </div>
  );
}

function ItemsTag() {
  return (
    <div className="mx-auto flex flex-col items-end justify-start gap-[72px] text-base">
      {items.map((item) => (
        <ItemTag item={item} key={item.id} />
      ))}
    </div>
  );
}
