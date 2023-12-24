export default function Programs() {

  return (
    <div className="Programs w-full h-[1469px] relative bg-white overflow-hidden overflow-auto">
      <div className="Ellipse absolute top-[636px] right-[-200px] w-72 h-72 bg-zinc-400 bg-opacity-30 rounded-full blur-3xl" />
      <div className="Ellipse absolute top-[205px] left-[-200px] w-64 h-64 bg-pink-300 bg-opacity-30 rounded-full blur-3xl" />

      <ProgramsArea />   
      <ItemsTag />
      <Button text={buttonText} img={arrowPic}/>
    </div>
    );
}

const arrowPic = "/arrow--right@2x.png"
const buttonText = "More About WSS"

const items = [
  {id: 1, title: 'Seminars', overline: 'Overline Goes Here', img: 'tmp', desc: 'The seminars comprise a four-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.'},
  {id: 2, title: 'Round Tables', overline: 'Overline Goes Here', img: 'tmp', desc: 'The seminars comprise a four-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.'},
  {id: 3, title: 'Lab Talks', overline: 'Overline Goes Here', img: 'tmp', desc: 'The seminars comprise a four-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.'},
];

function ProgramsArea() {
  return (
<div className="AutoLayoutVertical absolute top-[0px] left-[calc(50%_-_145px)] w-[290px] h-[104px] flex-col justify-start items-center inline-flex">
  <div className="OverlineGoesHere text-neutral-400 text-lg font-medium font-['Manrope'] uppercase tracking-wide">Overline Goes Here</div>
  <div className="Programs text-slate-800 text-[64px] font-bold font-['Manrope']">Programs</div>
</div>
    )
}


function Button({text, img}) {
  return (
<div className="AutoLayoutHorizontal absolute top-[1298px] left-[calc(50%_-_121px)] w-52 h-16 px-8 bg-gray-700 rounded-md justify-center items-center gap-2.5 flex items-center">
  <div className="MoreAboutWss text-white text-lg font-bold font-['Manrope']">{text}</div>
  <div className="ArrowRight w-6 h-6 relative">
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0 object-cover justify-center"
          alt="arrow"
          src={img}
        />
  </div>
</div>
    )
}

function ItemText({title, overline, description}) {
  return (
<div className="AutoLayoutVertical w-96 h-[100%] flex-col justify-start items-start gap-2.5 inline-flex">
  <div className="AutoLayoutVertical flex-col justify-start items-start flex">
    <div className="overline text-neutral-400 text-[16px] font-medium font-['Manrope'] uppercase tracking-wide">{overline}</div>
    <div className="title text-slate-800 text-[48px] font-bold font-['Manrope']">{title}</div>
  </div>
  <div className="description w-96 text-neutral-400 text-[18px] font-normal font-['Manrope'] leading-relaxed">{description}</div>
</div>
);
}

function ItemImg({img}) {
  if (img.localeCompare("") == 0) 
    return <div className="Image grow shrink basis-0 h-72 bg-gray-200 rounded-lg" />
  else
    return (
        <div className="Image w-[433px] h-[300px] rounded-lg" >
          <img
            className="relative w-full h-full overflow-hidden shrink-0 object-cover"
            alt=""
            src={img}
          />
        </div>
      )
}

function ItemTag({item}) {
  if (item.id % 2 == 1)
    return (
      <div className="AutoLayoutHorizontal w-[993px] h-[300px] justify-start items-center gap-20 flex items-center">
        <ItemText title={item.title} overline={item.overline} description={item.desc} />
        <ItemImg img={item.img} />
      </div>
      )
  else
    return (
      <div className="AutoLayoutHorizontal w-[993px] h-[300px] justify-start items-center gap-20 inline-flex">
        <ItemImg img={item.img} />
        <ItemText title={item.title} overline={item.overline} description={item.desc} />
      </div>
      )
}

function ItemsTag() {
  return (
    <div className="relative top-[174px] left-[calc(50%_-_497px)] w-[993px] flex flex-col items-end justify-start gap-[72px] text-base">
      {items.map((item) => (
      <ItemTag item={item} />
    ))}
    </div>
    )
}