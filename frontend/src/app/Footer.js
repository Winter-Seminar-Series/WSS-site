import Image from 'next/image'

// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-white text-center text-gray-700">
      <Timer />
      <div className="mt-6 space-y-6 pe-28 ps-28">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/source/sut_footer.svg"
                alt="Facebook"
                width="60"
                height="60"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/source/wss_footer.svg" alt="LinkedIn" width="71" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/source/ssc_footer.svg" alt="Instagram" width="95" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/source/facebook.svg"
                alt="Facebook"
                width="56"
                height="56"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/source/instagram.svg"
                alt="Instagram"
                width="56"
                height="56"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/source/linkedin.svg"
                alt="LinkedIn"
                width="56"
                height="56"
              />
            </a>
          </div>
        </div>
        <div className="space-y-1 pb-6">
          <p className="flex items-center justify-start text-sm">
            The event is held by the Student Scientific Chapter (SSC) of
            Computer
          </p>
          <p className="flex items-center justify-start text-sm">
            Engineering Department of Sharif University of Technology
          </p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <a
            href="https://www.google.com/maps/place/Sharif+University+of+Technology"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <img
              src="/source/location.svg"
              alt="Location"
              width="48"
              height="48"
            />
            <div className="mx-auto max-w-screen-lg space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Location
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                Sharif University of Technology
              </p>
            </div>
          </a>
          <a
            href="https://www.google.com/maps/place/Sharif+University+of+Technology"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <img src="/source/more.svg" alt="Location" width="48" height="48" />
            <div className="mx-auto max-w-screen-lg space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">Address</p>
              <p className="flex items-center justify-start text-sm font-semibold">
                Azadi Street, District 2, Tehran, Iran
              </p>
            </div>
          </a>
          <a
            href="mailto:wss@ce.sharif.edu"
            className="flex items-center justify-center gap-2"
          >
            <img src="/source/email.svg" alt="Email" width="48" height="48" />
            <div className="mx-auto max-w-screen-lg space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">Mail</p>
              <p className="flex items-center justify-start text-sm font-semibold">
                wss@ce.sharif.edu
              </p>
            </div>
          </a>
          <a
            href="tel:+9802166165781"
            className="flex items-center justify-center gap-2"
          >
            <img src="/source/call.svg" alt="Phone" width="48" height="48" />
            <div className="mx-auto max-w-screen-lg space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">Tel</p>
              <p className="flex items-center justify-start text-sm font-semibold">
                +98 (021) 66 16 57 8
              </p>
            </div>
          </a>
        </div>
        <div className="flex items-center justify-between pb-4 text-lightslategray">
          <div className="flex items-center gap-4">
            <a href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">About us</p>
            </a>
            <a href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">Contact</p>
            </a>
            <a href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">Privacy Policy</p>
            </a>
            <a href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">Sitemap</p>
            </a>
            <a href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">Terms of Use</p>
            </a>
          </div>
          <div className="flex items-center justify-between">
            <p className="mt-6 text-sm">© 2015-2024, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Timer() {
  return (
    <div
      className="relative flex h-64 items-center justify-between bg-cover bg-center bg-no-repeat px-28 py-5 text-white"
      style={{
        backgroundImage: 'url(/source/footer_rectangle.svg)',
        backgroundSize: '100% auto', // Adjust this line to control background size
      }}
    >
      <div className="max-w-screen-lg items-start justify-start">
        <p className="font-manrope font-medium text-left text-lg text-white/60 uppercase">Overline Goes Here</p>
        <h1 className="font-manrope font-bold text-13xl text-white">
          Sign Up and Enjoy it
        </h1>
      </div>
      <div className="flex space-x-4">
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
      <button className="rounded-md w-50 bg-white px-8 py-5 text-darkslategray-100 font-bold transition-colors text-lg flex items-center justify-center hover:bg-gray-100">
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
  );
}
