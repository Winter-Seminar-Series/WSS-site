import Image from 'next/image';
import { getTimeSpanInMinutes } from '../../../lib/date';
import { LabTalk, Seminar } from '../../../lib/types';
import calender from '../assets/Calendar.svg';
import clock from '../assets/Clock.svg';

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'long', // 'numeric', '2-digit', 'long', 'short', or 'narrow'
    day: 'numeric', // 'numeric' or '2-digit'
  };
  return date?.toLocaleDateString('en-US', options);
};

const formatTime = (time: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return time?.toLocaleString('en-US', options);
};

export default function LabTalk({ labTalk }: { labTalk: LabTalk }) {
  return (
    <div>
      <div
        style={{ backgroundImage: 'url(/source/Rectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[400px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <main>
        <div className="my-13 px-auto py-auto mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
          <div className="flex flex-col items-start justify-center gap-8 px-20 py-[60px]">
            <div className="flex flex-col items-start justify-center  gap-2.5 self-stretch">
              <div className="flex items-center space-x-4 text-lg font-medium uppercase not-italic leading-[normal] tracking-[0.72px] text-[#8A8998]">
                <div className="flex items-center space-x-2 uppercase">
                  <Image src={calender} alt="" width={20} height={20} />
                  <span>
                    {formatDate(labTalk.date)},{' '}
                    {formatTime(labTalk.startingTime)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={clock} alt="" width={20} height={20} />
                  <span>
                    {getTimeSpanInMinutes(
                      labTalk.startingTime,
                      labTalk.endingTime,
                    )}{' '}
                    MINUTES
                  </span>
                </div>
              </div>
              <div className="self-stretch text-[40px] font-semibold not-italic leading-[48px] tracking-[-0.4px] text-black">
                {labTalk.name}
              </div>
            </div>
            <img
              className="w-full rounded-2xl object-cover object-center"
              src={labTalk.poster}
            />
            <div className="flex flex-col items-start gap-2">
              <label className="text-[32px] font-semibold not-italic leading-[normal] tracking-[-0.32px] text-black">
                Abstract
              </label>
              <div
                className="text-base font-normal not-italic leading-[25px] text-[#8A8998]"
                dangerouslySetInnerHTML={{ __html: labTalk.description }}
              />
            </div>
            <div className="flex flex-col items-start gap-7 self-stretch">
              <label className="text-[32px] font-semibold not-italic leading-[normal] tracking-[-0.32px] text-black">
                Presenter
              </label>
              <div className="flex flex-col items-start gap-12 self-stretch">
                <div
                  className="flex flex-col items-start justify-center gap-2 self-stretch"
                  key={labTalk.speaker.id}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={labTalk.speaker.image}
                    alt={labTalk.speaker.name}
                    className="h-[104px] w-[104px]"
                  ></img>
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <label className="self-stretch text-2xl font-semibold not-italic leading-[normal] tracking-[-0.24px] text-black">
                      {labTalk.speaker.name}
                    </label>
                    <p className="self-stretch text-lg font-normal not-italic leading-[27px] text-[#8A8998]">
                      {labTalk.speaker.designation}
                    </p>
                    <div
                      className="text-base font-normal not-italic leading-[25px] text-[#8A8998]"
                      dangerouslySetInnerHTML={{
                        __html: labTalk.speaker.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
