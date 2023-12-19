import Rectangle from '../../public/source/Rectangle.png';
import Frame from '../../public/source/Frame.svg';

export default function Header() {
  // TODO
  return (
    <header>
      <div
        className="header-main h-[900px] pt-8"
        style={{
          // background: 'linear-gradient(180deg, rgba(18, 34, 88, 0.7) 0%, rgba(19, 37, 101, 0.7) 100%)'
          backgroundImage: `url(${Rectangle.src})`,
        }}
      >
        <div
          class="mx-auto flex h-7 w-[1201px] items-center justify-between mb-8"
          style={{}}
        >
          <a href="home.html" class="h-[45.129px] w-[57.98px] shrink-0">
            <img
              class="relative h-[54px] w-[58px] object-cover"
              src="source/WSS-LOGO.png"
            />
          </a>
          <div class="flex items-center justify-center gap-8">
            <div class="text-base font-medium not-italic leading-[normal] text-neutral-50 no-underline">
              <div class="relative inline-block">
                <button class="border-[none] bg-[#04aa6d00] p-2.5 text-base text-[white]">
                  9th WSS
                  <img
                    src="source/Frame.svg"
                    class="inline-block h-6 w-6 shrink-0"
                  />
                </button>
                <div class="absolute z-[1] hidden min-w-[160px] bg-[#f1f1f1] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)]">
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
            <a href="home.html" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd0]">
              Home
            </a>
            <a href="" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd]">
              Seminars
            </a>
            <a href="" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd]">
              Lab Talks
            </a>
            <a href="" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd]">
              Round Tables
            </a>
            <a href="about.html" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd0]">
              About Us
            </a>
          </div>
          <div class="flex items-center gap-1.5">
            <a
              href=""
              class="flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 py-0 no-underline"
            >
              <p class="text-base font-semibold not-italic leading-[normal] text-[#0B3678] no-underline">
                Sign Up
              </p>
            </a>
            <a
              href=""
              class="flex h-12 items-center justify-center gap-2 rounded-md border border-solid border-[rgba(255,255,255,0.30)] px-6 py-0"
            >
              <p class="text-base font-semibold not-italic leading-[normal] text-white">
                Login
              </p>
            </a>
          </div>
        </div>
        <div class="flex flex-row max-w-[1200px] mx-auto">
          <div>
            <p class="text-white text-[108px] not-italic font-bold leading-[106px] tracking-[-2.16px] pb-10">WSS - Winter Seminar Series</p>
            <div class="text-white text-2xl not-italic font-semibold leading-[normal] tracking-[-0.48px]">
              <p class="">
                Advanced Topics in Computer Science and Engineering
              </p>
              <div className="text-[rgba(255,255,255,0.80)] text-left text-xl not-italic font-normal leading-[normal] mt-2">
                <img class="w-6 h-6 inline-block mr-2" src="source/Location.svg" />
                Sharif University of Technology - Tehran, Iran
              </div>
              <div class="text-[rgba(255,255,255,0.80)] text-left text-xl not-italic font-normal leading-[normal] mt-2">
                <img class="w-6 h-6 inline-block  mr-2" src="source/Calendar.svg" />
                Apr 6th, 2023 -Apr 9th, 2023
              </div>
            </div>
            <div class="flex flex-row items-start gap-[52px] text-white text-5xl not-italic font-bold leading-[normal] tracking-[-0.96px] pt-[52px]">
              <div class="flex flex-col justify-center items-center gap-3 text-white">
                <div class="flex flex-col justify-center items-center border pt-2 pb-3 px-4 rounded-lg border-solid border-[rgba(255,255,255,0.30)]">21</div>
                <p class="text-white text-base not-italic font-normal leading-[normal] tracking-[0.32px] uppercase">DAYS</p>
              </div>
              <div class="text-white text-5xl not-italic font-bold leading-[normal] tracking-[-0.96px]">:</div>
              <div class="flex flex-col justify-center items-center gap-3 text-white">
                <div class="flex flex-col justify-center items-center border pt-2 pb-3 px-4 rounded-lg border-solid border-[rgba(255,255,255,0.30)]">16</div>
                <p class="text-white text-base not-italic font-normal leading-[normal] tracking-[0.32px] uppercase">HOURS</p>
              </div>
              <div class="text-white text-5xl not-italic font-bold leading-[normal] tracking-[-0.96px]">:</div>
              <div class="flex flex-col justify-center items-center gap-3 text-white">
                <div class="flex flex-col justify-center items-center border pt-2 pb-3 px-4 rounded-lg border-solid border-[rgba(255,255,255,0.30)]">05</div>
                <p class="text-white text-base not-italic font-normal leading-[normal] tracking-[0.32px] uppercase">MINUTES</p>
              </div>
              <div class="text-white text-5xl not-italic font-bold leading-[normal] tracking-[-0.96px]">:</div>
              <div class="flex flex-col justify-center items-center gap-3 text-white">
                <div class="flex flex-col justify-center items-center border pt-2 pb-3 px-4 rounded-lg border-solid border-[rgba(255,255,255,0.30)]">45</div>
                <p class="text-white text-base not-italic font-normal leading-[normal] tracking-[0.32px] uppercase">SECONDS</p>
              </div>
            </div>
          </div>
          <div class="inline-flex h-[535px] w-[203px] flex-col justify-between items-end shrink-0">
            <div class="flex flex-col justify-center items-end gap-[-4px]">
              <p class="text-white text-6xl not-italic font-bold leading-[normal] tracking-[-2.4px]">30+</p>
              <p class="text-[rgba(255,255,255,0.80)] text-center text-base not-italic font-normal leading-[normal]">Top Level Masters</p>
            </div>
            <div class="flex flex-col justify-center items-end gap-[-4px]">
              <p class="text-white text-6xl not-italic font-bold leading-[normal] tracking-[-2.4px]">15000+</p>
              <p class="text-[rgba(255,255,255,0.80)] text-center text-base not-italic font-normal leading-[normal]">Total Subscribers</p>
            </div>
            <div class="flex flex-col justify-center items-end gap-[-4px]">
              <p class="text-white text-6xl not-italic font-bold leading-[normal] tracking-[-2.4px]">12+</p>
              <p class="text-[rgba(255,255,255,0.80)] text-center text-base not-italic font-normal leading-[normal]">High-Quality Seminars</p>
            </div>
            <div class="flex flex-col justify-center items-end gap-[-4px]">
              <p class="text-white text-6xl not-italic font-bold leading-[normal] tracking-[-2.4px]">30+</p>
              <p class="text-[rgba(255,255,255,0.80)] text-center text-base not-italic font-normal leading-[normal]">Top Level Masters</p>
            </div>
          </div>
        </div>
        <div class="flex w-[1199px] flex-col justify-center items-center gap-8 shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)] ml-[121px] mr-[120px] mt-[92px] pb-10 rounded-2xl bg-white">
          <div class="text-[#1F2B3D] text-xl not-italic font-medium leading-[normal] tracking-[0.8px] uppercase mt-10 mb-8">
            Presentations from 15+ top level companies and masters
          </div>
          <div class="flex flex-row flex-wrap justify-between items-center self-stretch w-[1063px] h-[70px] mx-auto">
            <a href="https://www.apple.com">
              <img src="source/logos/Apple.png" />
            </a>
            <a href="https://www.ed.ac.uk">
              <img src="source/logos/Edinburgh.png" />
            </a>
            <a href="https://www.epfl.ch/en/">
              <img src="source/logos/EPFL.png" />
            </a>
            <a href="https://www.uga.edu">
              <img src="source/logos/Georgia.png" />
            </a>
            <a href="https://www.google.com">
              <img src="source/logos/Google.png" />
            </a>
            <a href="https://www.london.ac.uk">
              <img src="source/logos/London.png" />
            </a>
            <a href="https://www.sharif.edu">
              <img class="h-[61.668px] shrink-0" src="source/logos/Sharif.png" />
            </a>
            <a href="https://umd.edu">
              <img src="source/logos/Maryland.png" />
            </a>
          </div>
          <div class="flex flex-row flex-wrap justify-between items-center self-stretch w-[1063px] h-[70px] mx-auto">
            <a href="https://www.microsoft.com/de-de/">
              <img src="source/logos/Microsoft.png" />
            </a>
            <a href="https://www.mit.edu">
              <img src="source/logos/MIT.png" />
            </a>
            <a href="https://openai.com">
              <img src="source/logos/OpenAI.png" />
            </a>
            <a href="https://www.princeton.edu">
              <img src="source/logos/Princeton.png" />
            </a>
            <a href="https://www.stanford.edu">
              <img src="source/logos/Stanford.png" />
            </a>
            <a href="https://www.upenn.edu">
              <img src="source/logos/UPenn.png" />
            </a>
            <a href="https://uwaterloo.ca">
              <img src="source/logos/Waterloo.png" />
            </a>
            <a href="https://www.universityofcalifornia.edu">
              <img src="source/logos/California.png" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
