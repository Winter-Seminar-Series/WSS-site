export default function Programs() {

  return (
    <div className="relative bg-white w-full h-[1469px] overflow-hidden text-left text-lg text-lightslategray font-manrope">
      <div className="absolute top-[205px] left-[-158px] rounded-[50%] bg-dodgerblue [filter:blur(516px)] w-[252px] h-[252px]" />
      <div className="absolute top-[636px] left-[1284px] rounded-[50%] bg-darkslategray-200 [filter:blur(404px)] w-[277px] h-[277px]" />
      {programsArea(programs, programs_overline)}    
      {itemsTag()}
      {button(buttonText, arrowPic)}
    </div>
    );
}

const arrowPic = "/arrow--right@2x.png"
const buttonText = "More About WSS"
const programs_overline = "Overline Goes Here"
const programs = "Programs"

const items = [
  {id: 1, title: 'Seminars', overline: 'Overline Goes Here', img: '', desc: 'The seminars comprise a four-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.'},
  {id: 2, title: 'Round Tables', overline: 'Overline Goes Here', img: '', desc: 'The seminars comprise a four-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.'},
  {id: 3, title: 'Lab Talks', overline: 'Overline Goes Here', img: '', desc: 'The seminars comprise a four-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.'},
];

function programsArea(programs, overline) {
  return (
      <div className="absolute top-[0px] left-[calc(50%_-_145px)] flex flex-col items-center justify-start">
        <div className="relative tracking-[0.04em] uppercase font-medium">
          {overline}
        </div>
        <b className="relative text-45xl tracking-[-0.02em] inline-block text-darkslategray-100 mt-[-8px]">
          {programs}
        </b>
      </div>
    )
}

function button(text, img) {
  return (
      <div className="absolute top-[1298px] left-[calc(50%_-_121px)] rounded-md bg-darkslateblue h-16 overflow-hidden flex flex-row items-center justify-center py-0 px-8 box-border gap-[10px] text-white">
        <b className="relative tracking-[-0.01em]">{text}</b>
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0 object-cover"
          alt="arrow"
          src={img}
        />
      </div>
    )
}

function itemText(title, overline, description) {
  return (
        <div className="shrink-0 flex flex-col items-start justify-start gap-[11px]">
          <div className="shrink-0 flex flex-col items-start justify-start">
            <div className="relative tracking-[0.04em] uppercase font-medium">
              {overline}
            </div>
            <b className="relative text-33xl tracking-[-0.02em] text-darkslategray-100">
              {title}
            </b>
          </div>
          <div className="relative text-lg leading-[27px] inline-block w-[480px]">
            {description}
          </div>
        </div>
    )
}

function itemImg(img) {
  if (img.localeCompare("") == 0) 
    return <div className="flex-1 relative rounded-lg bg-whitesmoke h-[300px]" ></div>
  else
    return (
        <div className="flex-1 relative rounded-lg h-[300px]" >
          <img
            className="relative w-full h-full overflow-hidden shrink-0 object-cover"
            alt=""
            src={img}
          />
        </div>
      )
}

function getItemTag(item) {
  if (item.id % 2 == 1)
    return (
      <div className="self-stretch flex flex-row items-center justify-start gap-[80px]">
        {itemText(item.title, item.overline, item.desc)}
        {itemImg(item.img)}
      </div>
      )
  else
    return (
      <div className="self-stretch flex flex-row items-center justify-start gap-[80px]">
        {itemImg(item.img)}
        {itemText(item.title, item.overline, item.desc)}
      </div>
      )
}

function itemsTag() {
  return (
    <div className="relative top-[174px] left-[calc(50%_-_497px)] w-[993px] flex flex-col items-end justify-start gap-[72px] text-base">
      {getItemTag(items[0])}
      {getItemTag(items[1])}
      {getItemTag(items[2])}
    </div>
    )
}
