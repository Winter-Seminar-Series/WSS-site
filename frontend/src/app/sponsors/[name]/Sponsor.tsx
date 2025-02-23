import { Seminar } from '../../../lib/types';
import React from 'react';

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

export default function Sponsor({ seminar }: { seminar: Seminar }) {
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
              <div className="flex-col gap-2">
                <p className="max-md:text-md text-2xl font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
                  Sponsors:
                </p>
                <p className="text-[76px] font-bold not-italic leading-none tracking-[-1.52px] text-[#1F2B3D] max-md:text-5xl">
                  Ramzinex
                </p>
              </div>
            </div>

            <img
              className="w-full rounded-2xl object-cover object-center"
              src={seminar.poster}
            />
            <div className="flex flex-col items-start gap-2">
              <label className="text-[32px] font-semibold not-italic leading-[normal] tracking-[-0.32px] text-black">
                About
              </label>
              <div className="text-base font-normal not-italic leading-[25px] text-[#8A8998]">
                Cell images contain a vast amount of quantifiable information
                about the status of the cell: for example, whether it is
                diseased, whether it is responding to a drug treatment, or
                whether its function has been disrupted by a genetic mutation.
                We aim to go beyond measuring individual cell features that
                biologists already know are relevant to a particular disease.
                Instead, in a strategy called image-based profiling, often using
                the Cell Painting assay, we extract hundreds of features of
                cells from images. Just like transcriptional profiling, the
                similarities and differences in the patterns of extracted
                features reveal connections among diseases, drugs, and genes and
                are a rich source for machine learning.
                <br />
                <br />
                We are harvesting similarities in image-based profiles to
                identify how diseases, drugs, and genes affect cells, which can
                uncover the impact of drugs and genes, predict assay outcomes,
                discover disease-associated phenotypes, identify the functional
                impact of disease-associated alleles, and find novel therapeutic
                candidates.
              </div>
            </div>
            <div className="flex flex-col items-start gap-7 self-stretch">
              <label className="text-[32px] font-semibold not-italic leading-[normal] tracking-[-0.32px] text-black">
                Links
              </label>
              <div className="flex flex-col items-start gap-12 self-stretch">
                <div className="flex items-start justify-start gap-2 self-stretch">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <a
                    href={'https://google.com'}
                    className="self-stretch text-lg font-bold not-italic leading-[27px] text-[#9D6D9B] underline"
                  >
                    Random-kossher1
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
