import { Workshop as WorkshopType } from '../../../lib/types';

export default function Workshop({ workshop }: { workshop: WorkshopType }) {
  return (
    <main>
      <div className="my-13 px-auto py-auto mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex flex-col items-start justify-center gap-8 px-8 py-[60px] md:px-[140px]">
          <div className="flex flex-col items-start justify-center  gap-2.5 self-stretch">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <img className="h-5 w-5" src="/source/Calendar.svg" />
                <label className="text-lg font-medium uppercase not-italic leading-[normal] tracking-[0.72px] text-[#8A8998]">
                  April 7th - june 11th
                </label>
              </div>
              <div className="flex items-center gap-1">
                <img className="h-5 w-5" src="source/Category.svg" />
                <label className="text-lg font-medium uppercase not-italic leading-[normal] tracking-[0.72px] text-[#8A8998]">
                  {workshop.sessions.length} Modules
                </label>
              </div>
            </div>
            <div className="self-stretch text-[40px] font-semibold not-italic leading-[48px] tracking-[-0.4px] text-black">
              {workshop.name}
            </div>
          </div>
          <img className="w-full" src=""></img>
          <div className="flex flex-col items-start gap-2">
            <label className="text-[32px] font-semibold not-italic leading-[normal] tracking-[-0.32px] text-black">
              Abstract
            </label>
            <p className="text-base font-normal not-italic leading-[25px] text-[#8A8998]">
              {workshop.description}
            </p>
          </div>
          <div className="w-full space-y-2">
            <div className="text-[32px] font-semibold not-italic leading-[normal] tracking-[-0.32px] text-black">
              Modules
            </div>
            {workshop.sessions.map((session, index) => (
              <div
                className="flex items-start gap-2 rounded-lg border border-solid border-[rgba(201,201,207,0.40)] px-5 py-4"
                key={session.id}
              >
                <label className="text-base font-medium not-italic leading-[normal] tracking-[-0.16px] text-black">
                  Module {index + 1}: {session.name} ({session.speaker.name})
                </label>
                <img src="/Arrow.svg"></img>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-7 self-stretch">
            <label className="text-[32px] font-semibold not-italic leading-[normal] tracking-[-0.32px] text-black">
              Presenters
            </label>
            <div className="flex flex-col items-start gap-12 self-stretch">
              {/* workshop.presenters koo? */}
              <div className="flex flex-col items-start justify-center gap-2 self-stretch">
                <img
                  src=""
                  className="h-[104px] w-[104px] fill-[#D9D9D9]"
                ></img>
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <label className="self-stretch text-2xl font-semibold not-italic leading-[normal] tracking-[-0.24px] text-black">
                    Anne carpenter
                  </label>
                  <p className="self-stretch text-lg font-normal not-italic leading-[27px] text-[#8A8998]">
                    Institute Scientist and Imaging Platform Director, Broad
                  </p>
                  <p className="text-base font-normal not-italic leading-[25px] text-[#8A8998]">
                    Anne Carpenter is senior director of the Imaging Platform at
                    Broad Institute of MIT and Harvard, where she is also an
                    institute scientist. With a strong background in cell
                    biology, microscopy, and computational biology, her
                    expertise is in developing and applying methods for
                    extracting quantitative information from biological images,
                    especially in a high-throughput manner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
