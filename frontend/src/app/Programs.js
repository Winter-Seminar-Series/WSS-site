import Image from 'next/image';

export default function Programs() {
  return (
    <div className="Programs relative h-[1469px] w-full overflow-auto overflow-hidden bg-white">
      <div className="Ellipse absolute right-[-200px] top-[636px] h-72 w-72 rounded-full bg-zinc-400 bg-opacity-30 blur-3xl" />
      <div className="Ellipse absolute left-[-200px] top-[205px] h-64 w-64 rounded-full bg-pink-300 bg-opacity-30 blur-3xl" />

      <ProgramsArea />
      <ItemsTag />
      <Button text={buttonText} />
    </div>
  );
}

const buttonText = 'More About WSS';

const items = [
  {
    id: 1,
    title: 'Seminars',
    overline: 'Overline Goes Here',
    img: 'tmp',
    desc: 'The seminars comprise a four-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.',
  },
  {
    id: 2,
    title: 'Round Tables',
    overline: 'Overline Goes Here',
    img: 'tmp',
    desc: "During the event, we host round table discussions on specific topics, inviting experts in the field to share their insights and engage with participants' concerns. Please note that the round tables are conducted in Persian.",
  },
  {
    id: 3,
    title: 'Lab Talks',
    overline: 'Overline Goes Here',
    img: 'tmp',
    desc: 'This section focuses on the laboratories of the Faculty of Computer Engineering at Sharif University of Technology. In each session, we feature a different laboratory, with members introducing their lab and discussing current research topics. This provides participants with an opportunity to learn about cutting-edge research and developments in computer engineering.',
  },
];

function ProgramsArea() {
  return (
    <div className="AutoLayoutVertical absolute left-[calc(50%_-_145px)] top-[0px] inline-flex h-[104px] w-[290px] flex-col items-center justify-start">
      <div className="OverlineGoesHere font-['Manrope'] text-lg font-medium uppercase tracking-wide text-neutral-400">
        Overline Goes Here
      </div>
      <div className="Programs font-['Manrope'] text-[64px] font-bold text-slate-800">
        Programs
      </div>
    </div>
  );
}

function Button({ text }) {
  return (
    <div className="AutoLayoutHorizontal absolute left-[calc(50%_-_121px)] top-[1298px] flex h-16 w-64 items-center items-center justify-center gap-2.5 rounded-md bg-secondary px-8 mt-10 text-white">
      <div className="font-['Manrope'] text-lg font-bold">{text}</div>
      <div className="relative h-6 w-6">
        <Image
          src={'/source/arrow_right_white.svg'}
          alt=''
          width={20}
          height={20}
          className={'ml-3'}
        />
      </div>
    </div>
  );
}

function ItemText({ title, overline, description }) {
  return (
    <div className="AutoLayoutVertical inline-flex h-[100%] w-96 flex-col items-start justify-start gap-2.5">
      <div className="AutoLayoutVertical flex flex-col items-start justify-start">
        <div className="font-['Manrope'] text-[16px] font-medium uppercase tracking-wide text-neutral-400">
          {overline}
        </div>
        <div className="title font-['Manrope'] text-[48px] font-bold text-slate-800">
          {title}
        </div>
      </div>
      <div className="description w-96 font-['Manrope'] text-[18px] font-normal leading-relaxed text-neutral-400">
        {description}
      </div>
    </div>
  );
}

function ItemImg({ img }) {
  if (img.localeCompare('') == 0)
    return (
      <div className="Image h-72 shrink grow basis-0 rounded-lg bg-gray-200" />
    );
  else
    return (
      <div className="Image h-[300px] w-[433px] rounded-lg">
        <img
          className="relative h-full w-full shrink-0 overflow-hidden object-cover"
          alt=""
          src={img}
        />
      </div>
    );
}

function ItemTag({ item }) {
  if (item.id % 2 == 1)
    return (
      <div className="AutoLayoutHorizontal flex h-[300px] w-[993px] items-center items-center justify-start gap-20">
        <ItemText
          title={item.title}
          overline={item.overline}
          description={item.desc}
        />
        <ItemImg img={item.img} />
      </div>
    );
  else
    return (
      <div className="AutoLayoutHorizontal inline-flex h-[300px] w-[993px] items-center justify-start gap-20">
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
    <div className="relative left-[calc(50%_-_497px)] top-[174px] flex w-[993px] flex-col items-end justify-start gap-[72px] text-base">
      {items.map((item) => (
        <ItemTag item={item} key={item.id} />
      ))}
    </div>
  );
}
