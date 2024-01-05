export default function Navbar() {

    return <header class="max-lg:w-90 h-[116px]">
    <div
      className="header-main max-lg:w-[400px] max-lg:h-[896px] lg:h-[650px] max-lg:pt-8 lg:pt-8 bg-cover bg-center bg-no-repeat max-lg:bg-mobile lg:bg-navbar items-center"
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
    </div>
</header>
}