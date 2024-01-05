export default function Header() {
  return (
    <header className="max-lg:w-90 mb-60">
      <div
        className="max-lg:bg-mobile lg:bg-desktop items-center bg-cover bg-center bg-no-repeat max-lg:h-[896px] max-lg:w-[424px] max-lg:pt-8 lg:h-[900px] lg:pt-8"
        style={{ backgroundImage: `url(${Rectangle.src})` }}
      >
        <div className="mx-auto flex items-center justify-between max-lg:h-[38px] max-lg:w-[312px] lg:mb-8 lg:h-7 lg:w-[1201px]">
          <a
            href="home.html"
            className="shrink-0 max-lg:h-[31.8px] max-lg:w-[40.8px] lg:h-[45.129px] lg:w-[57.98px]"
          >
            <img
              className="relative object-cover max-lg:h-[31.8px] max-lg:w-[40.8px] lg:h-[54px] lg:w-[58px]"
              src="/source/WSS-LOGO.png"
            />
          </a>
          <div className="hidden items-center justify-center gap-8 lg:flex">
            <div className="text-base font-medium not-italic leading-[normal] text-neutral-50 no-underline">
              <div className="relative inline-block">
                <button className="border-[none] bg-[#04aa6d00] p-2.5 text-base text-[white]">
                  9th WSS
                  {/* <img
                    src={Frame.src}
                    className="inline-block shrink-0 lg:h-6 lg:w-6"
                  /> */}
                </button>
                <div className="absolute z-[1] hidden bg-[#f1f1f1] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] lg:min-w-[160px]">
                  <a href="home.html">9th Series</a>
                  <a href="#">8th Series</a>
                  <a href="#">7th Series</a>
                  <a href="#">6th Series</a>
                  <a href="#">5th Series</a>
                  <a href="#">4th Series</a>
                  <a href="#">3rd Series</a>
                  <a href="#">2nd Series</a>
                  <a href="#">1st Series</a>
                </div>
              </div>
            </div>
            <a
              href="home.html"
              className="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              Home
            </a>
            <a
              href=""
              className="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              Seminars
            </a>
            <a
              href=""
              className="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              Lab Talks
            </a>
            <a
              href=""
              className="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              Round Tables
            </a>
            <a
              href="about.html"
              className="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              About Us
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href=""
              className="max-lg:w-19 flex items-center justify-center rounded-md bg-white no-underline max-lg:h-9 max-lg:px-4 lg:h-12 lg:gap-2 lg:px-6 lg:py-0"
            >
              <p className="text-base font-semibold not-italic leading-[normal] text-[#0B3678] no-underline">
                Sign Up
              </p>
            </a>
            <a
              href=""
              className="max-lg:w-19 flex items-center justify-center rounded-md border  border-solid border-[rgba(255,255,255,0.30)] px-6 py-0 max-lg:h-9 max-lg:px-4 lg:h-12 lg:gap-2"
            >
              <p className="text-base font-semibold not-italic leading-[normal] text-white">
                Login
              </p>
            </a>
          </div>
        </div>
        <div className="mx-auto flex max-lg:mt-10 max-lg:w-[312px] max-lg:flex-col lg:mt-12 lg:max-w-[1200px] lg:flex-row">
          <div>
            <p className="max-lg:leading-15 max-lg:text-6xl font-bold not-italic text-white max-lg:pb-6 max-lg:tracking-[-1.2px] lg:pb-10 lg:text-[108px] lg:leading-[106px] lg:tracking-[-2.16px]">
              WSS - Winter Seminar Series
            </p>
            <div className="lg:text-2xl font-semibold not-italic leading-[normal] text-white max-lg:text-[21px] max-lg:leading-[30px] max-lg:tracking-[-0.42px] lg:tracking-[-0.48px]">
              <p className="">
                Advanced Topics in Computer Science and Engineering
              </p>
              <div className="flex max-lg:mt-5 max-lg:flex-row max-lg:items-start max-lg:gap-4 max-lg:self-stretch lg:flex-col">
                <div className="flex max-lg:flex-[1_0_0] max-lg:flex-col max-lg:gap-1.5 lg:mt-2 lg:flex-row">
                  <img
                    className="inline-block h-6 w-6 lg:mr-2"
                    src="/source/Location.svg"
                  />
                  <p className="max-lg:w-37 text-left font-normal not-italic text-[rgba(255,255,255,0.80)] max-lg:h-16 max-lg:self-stretch max-lg:text-sm max-lg:leading-[21px] lg:text-xl lg:leading-[normal]">
                    Sharif University of Technology - Tehran, Iran
                  </p>
                </div>
                <div className="flex max-lg:flex-[1_0_0] max-lg:flex-col max-lg:gap-1.5 lg:mt-2 lg:flex-row">
                  <img
                    className="inline-block h-6 w-6 lg:mr-2"
                    src="/source/Calendar.svg"
                  />
                  <p className="max-lg:w-37 max-lg:h-10.5 font-normal not-italic text-[rgba(255,255,255,0.80)] max-lg:self-stretch max-lg:text-sm max-lg:leading-[21px] lg:text-xl lg:leading-[normal]">
                    Apr 6th, 2023 -Apr 9th, 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:text-5xl flex flex-row items-start font-bold not-italic leading-[normal] text-white max-lg:mb-9 max-lg:items-start max-lg:justify-between max-lg:pt-7 lg:gap-[52px] lg:pt-[52px] lg:tracking-[-0.96px]">
              <div className="flex flex-col items-center justify-center text-white max-lg:gap-1 lg:gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-[rgba(255,255,255,0.30)] px-4 pb-3 pt-2 max-lg:text-xl">
                  21
                </div>
                <p className="text-base font-normal uppercase not-italic text-white lg:leading-[normal] lg:tracking-[0.32px]">
                  DAYS
                </p>
              </div>
              <div className="lg:text-5xl font-bold not-italic leading-[normal] text-white max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px] lg:tracking-[-0.96px]">
                :
              </div>
              <div className="flex flex-col items-center justify-center text-white max-lg:gap-1 lg:gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-[rgba(255,255,255,0.30)] px-4 pb-3 pt-2 max-lg:text-xl">
                  16
                </div>
                <p className="text-base font-normal uppercase not-italic leading-[normal] text-white lg:tracking-[0.32px]">
                  HOURS
                </p>
              </div>
              <div className="lg:text-5xl font-bold not-italic leading-[normal] text-white max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px] lg:tracking-[-0.96px]">
                :
              </div>
              <div className="flex flex-col items-center justify-center text-white max-lg:gap-1 lg:gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-[rgba(255,255,255,0.30)] px-4 pb-3 pt-2 max-lg:text-xl">
                  05
                </div>
                <p className="text-base font-normal uppercase not-italic leading-[normal] text-white lg:tracking-[0.32px]">
                  MINUTES
                </p>
              </div>
              <div className="lg:text-5xl font-bold not-italic leading-[normal] text-white max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px] lg:tracking-[-0.96px]">
                :
              </div>
              <div className="flex flex-col items-center justify-center text-white max-lg:gap-1 lg:gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-[rgba(255,255,255,0.30)] px-4 pb-3 pt-2 max-lg:text-xl">
                  45
                </div>
                <p className="text-base font-normal uppercase not-italic leading-[normal] text-white lg:tracking-[0.32px]">
                  SECONDS
                </p>
              </div>
            </div>
          </div>
          <div className="max-lg:h-37 max-lg:flex-wrap:wrap inline-flex shrink-0 flex-col justify-between max-lg:h-20 max-lg:flex-row max-lg:items-start lg:h-[535px] lg:w-[203px] lg:items-end">
            <div className="inline-flex shrink-0 flex-col max-lg:gap-6 lg:h-[245px] lg:justify-between">
              <div className="max-lg:h-12.5 flex flex-col items-end justify-center max-lg:items-start lg:gap-[-4px]">
                <p className="lg:text-6xl font-bold not-italic leading-[normal] text-white max-lg:text-[40px] max-lg:tracking-[-1.6px] lg:tracking-[-2.4px]">
                  30+
                </p>
                <p className="text-center text-base font-normal not-italic leading-[normal] text-[rgba(255,255,255,0.80)] max-lg:text-sm">
                  Top Level Masters
                </p>
              </div>
              <div className="max-lg:h-12.5 flex flex-col items-end justify-center max-lg:items-start lg:gap-[-4px]">
                <p className="lg:text-6xl font-bold not-italic leading-[normal] text-white max-lg:text-[40px] max-lg:tracking-[-1.6px] lg:tracking-[-2.4px]">
                  15000+
                </p>
                <p className="text-center text-base font-normal not-italic leading-[normal] text-[rgba(255,255,255,0.80)] max-lg:text-sm">
                  Total Subscribers
                </p>
              </div>
            </div>
            <div className="inline-flex shrink-0 flex-col max-lg:gap-6 lg:h-[245px] lg:justify-between">
              <div className="max-lg:h-12.5 flex flex-col items-end justify-center max-lg:items-start lg:gap-[-4px]">
                <p className="lg:text-6xl font-bold not-italic leading-[normal] text-white max-lg:text-[40px] max-lg:tracking-[-1.6px] lg:tracking-[-2.4px]">
                  12+
                </p>
                <p className="text-center text-base font-normal not-italic leading-[normal] text-[rgba(255,255,255,0.80)] max-lg:text-sm">
                  High-Quality Seminars
                </p>
              </div>
              <div className="max-lg:h-12.5 flex flex-col items-end justify-center max-lg:items-start lg:gap-[-4px]">
                <p className="lg:text-6xl font-bold not-italic leading-[normal] text-white max-lg:text-[40px] max-lg:tracking-[-1.6px] lg:tracking-[-2.4px]">
                  30+
                </p>
                <p className="text-center text-base font-normal not-italic leading-[normal] text-[rgba(255,255,255,0.80)] max-lg:text-sm">
                  Top Level Masters
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="mt-[92px] flex w-4/5 flex-col items-center justify-center rounded-2xl bg-white pb-10 shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)] lg:flex lg:gap-8">
            <div className="text-xl font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#1F2B3D] lg:mb-8 lg:mt-10">
              Presentations from 15+ top level companies and masters
            </div>
            <div className="grid grid-cols-8 items-center justify-center gap-x-16 gap-y-4 self-stretch px-16">
              <a href="https://www.apple.com">
                <img src="/source/logos/Apple.png" />
              </a>
              <a href="https://www.ed.ac.uk">
                <img src="/source/logos/Edinburgh.png" />
              </a>
              <a href="https://www.epfl.ch/en/">
                <img src="/source/logos/EPFL.png" />
              </a>
              <a href="https://www.uga.edu">
                <img src="/source/logos/Georgia.png" />
              </a>
              <a href="https://www.google.com">
                <img src="/source/logos/Google.png" />
              </a>
              <a href="https://www.london.ac.uk">
                <img src="/source/logos/London.png" />
              </a>
              <a href="https://www.sharif.edu">
                <img src="/source/logos/Sharif.png" />
              </a>
              <a href="https://umd.edu">
                <img src="/source/logos/Maryland.png" />
              </a>
              <a href="https://www.microsoft.com/de-de/">
                <img src="/source/logos/Microsoft.png" />
              </a>
              <a href="https://www.mit.edu">
                <img src="/source/logos/MIT.png" />
              </a>
              <a href="https://openai.com">
                <img src="/source/logos/OpenAI.png" />
              </a>
              <a href="https://www.princeton.edu">
                <img src="/source/logos/Princeton.png" />
              </a>
              <a href="https://www.stanford.edu">
                <img src="/source/logos/Stanford.png" />
              </a>
              <a href="https://www.upenn.edu">
                <img src="/source/logos/UPenn.png" />
              </a>
              <a href="https://uwaterloo.ca">
                <img src="/source/logos/Waterloo.png" />
              </a>
              <a href="https://www.universityofcalifornia.edu">
                <img src="/source/logos/California.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
