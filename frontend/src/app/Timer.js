import Image from 'next/image';

export default function Timer() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-11 text-white"
      style={{
        backgroundImage: 'url(/source/footer_rectangle.svg)',
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <div>
          <p className="font-manrope text-left text-lg font-medium uppercase text-white/60">
            Overline Goes Here
          </p>
          <h1 className="font-manrope text-5xl font-bold leading-normal text-white">
            Sign Up and Enjoy it
          </h1>
        </div>
        <div className="flex gap-x-4">
          <div className="flex flex-col items-center">
            <span className="w-12 rounded-md border border-white border-opacity-25 p-2 text-2xl font-normal ">
              21
            </span>
            <span className="pt-3 text-xs font-light">DAYS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="py-2 text-3xl font-semibold">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-12 rounded-md border border-white border-opacity-25 p-2 text-2xl font-normal ">
              16
            </span>
            <span className="pt-3 text-xs font-light">HOURS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="py-2 text-3xl font-semibold">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-12 rounded-md border border-white border-opacity-25 p-2 text-2xl font-normal ">
              05
            </span>
            <span className="pt-3 text-xs font-light">MINUTES</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="py-2 text-3xl font-semibold">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-12 rounded-md border border-white border-opacity-25 p-2 text-2xl font-normal ">
              45
            </span>
            <span className="pt-3 text-xs font-light">SECONDS</span>
          </div>
        </div>
        <button className="w-50 flex items-center justify-center rounded-md bg-white px-8 py-5 text-lg font-bold text-darkslategray-100 transition-colors hover:bg-gray-100">
          <div>Register Now</div>
          <Image
            src={'/source/arrow_right_black.svg'}
            alt={'view all arrow'}
            width={20}
            height={20}
            className={'ml-3'}
          />
        </button>
      </div>
    </div>
  );
}
