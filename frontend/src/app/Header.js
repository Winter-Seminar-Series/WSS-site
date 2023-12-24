import Rectangle from '../../public/source/Rectangle.png';
import Frame from '../../public/source/Frame.svg';
import mobile from '../../public/source/mobile.png'

export default function Header() {
  // TODO
  return (
    <header class="max-lg:w-90">
      <div
        className="header-main max-lg:w-[424px] max-lg:h-[896px] lg:h-[900px] max-lg:pt-8 lg:pt-8 bg-cover bg-center bg-no-repeat max-lg:bg-mobile lg:bg-desktop items-center"
        // style={{
        //   // background: 'linear-gradient(180deg, rgba(18, 34, 88, 0.7) 0%, rgba(19, 37, 101, 0.7) 100%)'
        //   backgroundImage: `url(${Rectangle.src})`,
        //   'md:max-lg': {
        //     backgroundImage: `url(${mobile.src})`, // Background image for small screens
        //   },
        // }}
      >
        <div
          class="mx-auto flex lg:h-7 lg:w-[1201px] items-center justify-between lg:mb-8 max-lg:w-[312px] max-lg:h-[38px]"
          style={{}}
        >
          <a href="home.html" class="lg:h-[45.129px] lg:w-[57.98px] shrink-0 max-lg:w-[40.8px] max-lg:h-[31.8px]">
            <img
              class="relative lg:h-[54px] lg:w-[58px] object-cover max-lg:w-[40.8px] max-lg:h-[31.8px]"
              src="source/WSS-LOGO.png"
            />
          </a>
          <div class="items-center justify-center gap-8 hidden lg:flex">
            <div class="text-base font-medium not-italic leading-[normal] text-neutral-50 no-underline">
              <div class="relative inline-block">
                <button class="border-[none] bg-[#04aa6d00] p-2.5 text-base text-[white]">
                  9th WSS
                  <img
                    src="source/Frame.svg"
                    class="inline-block lg:h-6 lg:w-6 shrink-0"
                  />
                </button>
                <div class="absolute z-[1] hidden lg:min-w-[160px] bg-[#f1f1f1] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)]">
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
            <a href="" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd0]">
              Seminars
            </a>
            <a href="" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd0]">
              Lab Talks
            </a>
            <a href="" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd0]">
              Round Tables
            </a>
            <a href="about.html" class="text-[white] no-underline block px-4 py-3 hover:bg-[#ddd0]">
              About Us
            </a>
          </div>
          <div class="flex items-center gap-1.5">
            <a
              href=""
              class="flex lg:h-12 max-lg:w-19 max-lg:h-9 max-lg:px-4 items-center justify-center lg:gap-2 rounded-md bg-white lg:px-6 lg:py-0 no-underline"
            >
              <p class="text-base font-semibold not-italic leading-[normal] text-[#0B3678] no-underline">
                Sign Up
              </p>
            </a>
            <a
              href=""
              class="flex lg:h-12 max-lg:w-19 max-lg:h-9 items-center justify-center  max-lg:px-4 lg:gap-2 rounded-md border border-solid border-[rgba(255,255,255,0.30)] px-6 py-0"
            >
              <p class="text-base font-semibold not-italic leading-[normal] text-white">
                Login
              </p>
            </a>
          </div>
        </div>
        <div class="flex lg:flex-row max-lg:flex-col lg:max-w-[1200px] max-lg:w-[312px] mx-auto lg:mt-12 max-lg:mt-10">
          <div>
            <p class="text-white lg:text-[108px] not-italic font-bold lg:leading-[106px] max-lg:leading-15 max-lg:tracking-[-1.2px] max-lg:text-6xl lg:tracking-[-2.16px] lg:pb-10 max-lg:pb-6">WSS - Winter Seminar Series</p>
            <div class="text-white lg:text-2xl max-lg:text-[21px] max-lg:leading-[30px] max-lg:tracking-[-0.42px] not-italic font-semibold leading-[normal] lg:tracking-[-0.48px]">
              <p class="">
                Advanced Topics in Computer Science and Engineering
              </p>
              <div class="flex max-lg:flex-row lg:flex-col max-lg:mt-5 max-lg:gap-4 max-lg:items-start max-lg:self-stretch">
                <div className="lg:mt-2 flex lg:flex-row max-lg:flex-col max-lg:gap-1.5 max-lg:flex-[1_0_0]">
                  <img class="w-6 h-6 inline-block lg:mr-2" src="source/Location.svg" />
                  <p class="max-lg:self-stretch text-[rgba(255,255,255,0.80)] text-left max-lg:text-sm lg:text-xl not-italic font-normal max-lg:leading-[21px] lg:leading-[normal] max-lg:w-37 max-lg:h-16">Sharif University of Technology - Tehran, Iran</p>
                </div>
                <div class="lg:mt-2 flex lg:flex-row max-lg:flex-col max-lg:gap-1.5 max-lg:flex-[1_0_0]">
                  <img class="w-6 h-6 inline-block lg:mr-2" src="source/Calendar.svg" />
                  <p class="max-lg:self-stretch text-[rgba(255,255,255,0.80)] max-lg:text-sm lg:text-xl not-italic font-normal max-lg:leading-[21px] lg:leading-[normal] max-lg:w-37 max-lg:h-10.5">Apr 6th, 2023 -Apr 9th, 2023</p>
                </div>
              </div>
            </div>
            <div class="flex flex-row items-start lg:gap-[52px] text-white lg:text-5xl not-italic font-bold leading-[normal] lg:tracking-[-0.96px] lg:pt-[52px] max-lg:pt-7 max-lg:justify-between max-lg:items-start max-lg:mb-9">
              <div class="flex flex-col justify-center items-center max-lg:gap-1 lg:gap-3 text-white">
                <div class="flex flex-col justify-center items-center max-lg:text-xl border pt-2 pb-3 px-4 rounded-lg border-solid border-[rgba(255,255,255,0.30)]">21</div>
                <p class="text-white text-base not-italic font-normal lg:leading-[normal] lg:tracking-[0.32px] uppercase">DAYS</p>
              </div>
              <div class="text-white lg:text-5xl not-italic font-bold leading-[normal] lg:tracking-[-0.96px] max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px]">:</div>
              <div class="flex flex-col justify-center items-center max-lg:gap-1 lg:gap-3 text-white">
                <div class="flex flex-col justify-center items-center max-lg:text-xl border pt-2 pb-3 px-4 rounded-lg border-solid border-[rgba(255,255,255,0.30)]">16</div>
                <p class="text-white text-base not-italic font-normal leading-[normal] lg:tracking-[0.32px] uppercase">HOURS</p>
              </div>
              <div class="text-white lg:text-5xl not-italic font-bold leading-[normal] lg:tracking-[-0.96px] max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px]">:</div>
              <div class="flex flex-col justify-center items-center max-lg:gap-1 lg:gap-3 text-white">
                <div class="flex flex-col justify-center items-center max-lg:text-xl border pt-2 pb-3 px-4 rounded-lg border-solid border-[rgba(255,255,255,0.30)]">05</div>
                <p class="text-white text-base not-italic font-normal leading-[normal] lg:tracking-[0.32px] uppercase">MINUTES</p>
              </div>
              <div class="text-white lg:text-5xl not-italic font-bold leading-[normal] lg:tracking-[-0.96px] max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px]">:</div>
              <div class="flex flex-col justify-center items-center max-lg:gap-1 lg:gap-3 text-white">
                <div class="flex flex-col justify-center items-center max-lg:text-xl border pt-2 pb-3 px-4 rounded-lg border-solid border-[rgba(255,255,255,0.30)]">45</div>
                <p class="text-white text-base not-italic font-normal leading-[normal] lg:tracking-[0.32px] uppercase">SECONDS</p>
              </div>
            </div>
          </div>
          <div class="inline-flex lg:h-[535px] lg:w-[203px] max-lg:h-37 flex-col justify-between lg:items-end shrink-0 max-lg:items-start max-lg:flex-wrap:wrap max-lg:h-20 max-lg:flex-row">
            <div className='inline-flex flex-col lg:justify-between shrink-0 lg:h-[245px] max-lg:gap-6'>
            <div class="flex flex-col max-lg:items-start justify-center items-end lg:gap-[-4px] max-lg:h-12.5">
              <p class="text-white max-lg:text-[40px] max-lg:tracking-[-1.6px] lg:text-6xl not-italic font-bold leading-[normal] lg:tracking-[-2.4px]">30+</p>
              <p class="text-[rgba(255,255,255,0.80)] max-lg:text-sm text-center text-base not-italic font-normal leading-[normal]">Top Level Masters</p>
            </div>
            <div class="flex flex-col max-lg:items-start justify-center items-end lg:gap-[-4px] max-lg:h-12.5">
              <p class="text-white max-lg:text-[40px] max-lg:tracking-[-1.6px] lg:text-6xl not-italic font-bold leading-[normal] lg:tracking-[-2.4px]">15000+</p>
              <p class="text-[rgba(255,255,255,0.80)] max-lg:text-sm text-center text-base not-italic font-normal leading-[normal]">Total Subscribers</p>
            </div>
            </div>
            <div className='inline-flex flex-col lg:justify-between shrink-0 lg:h-[245px] max-lg:gap-6'>
            <div class="flex flex-col max-lg:items-start justify-center items-end lg:gap-[-4px] max-lg:h-12.5">
              <p class="text-white max-lg:text-[40px] max-lg:tracking-[-1.6px] lg:text-6xl not-italic font-bold leading-[normal] lg:tracking-[-2.4px]">12+</p>
              <p class="text-[rgba(255,255,255,0.80)] max-lg:text-sm text-center text-base not-italic font-normal leading-[normal]">High-Quality Seminars</p>
            </div>
            <div class="flex flex-col max-lg:items-start justify-center items-end lg:gap-[-4px] max-lg:h-12.5">
              <p class="text-white max-lg:text-[40px] max-lg:tracking-[-1.6px] lg:text-6xl not-italic font-bold leading-[normal] lg:tracking-[-2.4px]">30+</p>
              <p class="text-[rgba(255,255,255,0.80)] max-lg:text-sm text-center text-base not-italic font-normal leading-[normal]">Top Level Masters</p>
            </div>
            </div>
          </div>
        </div>
        <div class="flex lg:max-w-[1199px] flex-col justify-center items-center lg:gap-8 shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)] mx-auto mt-[92px] pb-10 rounded-2xl bg-white hidden lg:flex">
          <div class="text-[#1F2B3D] text-xl not-italic font-medium leading-[normal] tracking-[0.8px] uppercase lg:mt-10 lg:mb-8">
            Presentations from 15+ top level companies and masters
          </div>
          <div class="flex flex-row flex-wrap justify-between items-center self-stretch lg:w-[1063px] lg:h-[70px] mx-auto">
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
