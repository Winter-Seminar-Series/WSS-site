import Link from 'next/link';

export default function Navbar() {
  return (
    <header class="max-lg:w-90 h-[116px]">
      <div
        className="header-main items-center bg-cover bg-center bg-no-repeat max-lg:h-[896px] max-lg:w-[400px] max-lg:bg-mobile max-lg:pt-8 lg:h-[650px] lg:bg-navbar lg:pt-8"
        // style={{
        //   // background: 'linear-gradient(180deg, rgba(18, 34, 88, 0.7) 0%, rgba(19, 37, 101, 0.7) 100%)'
        //   backgroundImage: `url(${Rectangle.src})`,
        //   'md:max-lg': {
        //     backgroundImage: `url(${mobile.src})`, // Background image for small screens
        //   },
        // }}
      >
        <div
          class="mx-auto flex items-center justify-between max-lg:h-[38px] max-lg:w-[312px] lg:mb-8 lg:h-7 lg:w-[1201px]"
          style={{}}
        >
          <Link
            href="/"
            class="shrink-0 max-lg:h-[31.8px] max-lg:w-[40.8px] lg:h-[45.129px] lg:w-[57.98px]"
          >
            <img
              class="relative object-cover max-lg:h-[31.8px] max-lg:w-[40.8px] lg:h-[54px] lg:w-[58px]"
              src="source/WSS-LOGO.png"
            />
          </Link>
          <div class="hidden items-center justify-center gap-8 lg:flex">
            <div class="text-base font-medium not-italic leading-[normal] text-neutral-50 no-underline">
              <div class="relative inline-block">
                <button class="border-[none] bg-[#04aa6d00] p-2.5 text-base text-[white]">
                  9th WSS
                  <img
                    src="source/Frame.svg"
                    class="inline-block shrink-0 lg:h-6 lg:w-6"
                  />
                </button>
                <div class="absolute z-[1] hidden bg-[#f1f1f1] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] lg:min-w-[160px]">
                  <a href="#">9th Series</a>
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
            <Link
              href="/"
              class="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              Home
            </Link>
            <Link
              href=""
              class="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              Seminars
            </Link>
            <Link
              href=""
              class="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              Lab Talks
            </Link>
            <Link
              href=""
              class="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              Round Tables
            </Link>
            <Link
              href=""
              class="block px-4 py-3 text-[white] no-underline hover:bg-[#ddd0]"
            >
              About Us
            </Link>
          </div>
          <div class="flex items-center gap-1.5">
            <Link
              href="/signup"
              class="max-lg:w-19 flex items-center justify-center rounded-md bg-white no-underline max-lg:h-9 max-lg:px-4 lg:h-12 lg:gap-2 lg:px-6 lg:py-0"
            >
              <p class="text-base font-semibold not-italic leading-[normal] text-[#0B3678] no-underline">
                Sign Up
              </p>
            </Link>
            <Link
              href="/login"
              class="max-lg:w-19 flex items-center justify-center rounded-md border  border-solid border-[rgba(255,255,255,0.30)] px-6 py-0 max-lg:h-9 max-lg:px-4 lg:h-12 lg:gap-2"
            >
              <p class="text-base font-semibold not-italic leading-[normal] text-white">
                Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
