// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-white text-center text-gray-700">
      <Timer />
      <div className="space-y-6 pe-28 ps-28">
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
        <div className="space-y-1 pb-10">
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
              <p className="flex items-center justify-start text-sm">
                Location
              </p>
              <p className="flex items-center justify-start text-sm">
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
              <p className="flex items-center justify-start text-sm">Address</p>
              <p className="flex items-center justify-start text-sm">
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
              <p className="flex items-center justify-start text-sm">Mail</p>
              <p className="flex items-center justify-start text-sm">
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
              <p className="flex items-center justify-start text-sm">Tel</p>
              <p className="flex items-center justify-start text-sm">
                +98 (021) 66 16 57 8
              </p>
            </div>
          </a>
        </div>
        <div className="flex items-center justify-between pb-4 text-gray-400">
          <div className="flex items-center gap-4">
            <a
                href=""
                className="flex items-center justify-center gap-2"
            ><p className="mt-6 text-sm">About us</p></a>
            <a
                href=""
                className="flex items-center justify-center gap-2"
            ><p className="mt-6 text-sm">Contact</p></a>
              <a
                  href=""
                  className="flex items-center justify-center gap-2"
              ><p className="mt-6 text-sm">Privacy Policy</p></a>
                <a
                    href=""
                    className="flex items-center justify-center gap-2"
                ><p className="mt-6 text-sm">Sitemap</p></a>
                  <a
                      href=""
                      className="flex items-center justify-center gap-2"
                  ><p className="mt-6 text-sm">Terms of Use</p></a>
          </div>
          <div className="flex items-center justify-between">
            <p className="mt-6 text-sm">© 2000-2021, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Timer() {
  return (
    <div
      className="relative flex h-64 items-center justify-between bg-cover bg-center text-white bg-no-repeat px-28 py-5"
      style={{
        backgroundImage: 'url(/source/footer_rectangle.svg)',
        backgroundSize: '100% auto', // Adjust this line to control background size
      }}
    >
        <div className="max-w-screen-lg justify-start items-start">
          <p className="text-xs uppercase text-left">Overline Goes Here</p>
          <h1 className="text-4xl font-semibold py-2 text-left">Sign Up and Enjoy it</h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-normal border border-opacity-25 border-white rounded-md p-2 ">
              21
            </span>
            <span className="text-xs pt-3">DAYS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-semibold py-2">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-normal border border-opacity-25 border-white rounded-md p-2 ">
              16
            </span>
            <span className="text-xs pt-3">HOURS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-semibold py-2">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-normal border border-opacity-25 border-white rounded-md p-2 ">
              05
            </span>
            <span className="text-xs pt-3">MINUTES</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-semibold py-2">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-normal border border-opacity-25 border-white rounded-md p-2 ">
              45
            </span>
            <span className="text-xs pt-3">SECONDS</span>
          </div>

        </div>
      <button className="bg-white text-purple-950 py-3 px-6 rounded-md hover:bg-gray-100 transition-colors font-semibold">
        Register Now →
      </button>


      {/*<div className="flex items-center gap-4 text-white">*/}
      {/*  <div className="mx-auto max-w-screen-lg space-y-1">*/}
      {/*    <p className="flex items-center justify-start text-xs">Overline Goes Here</p>*/}
      {/*    <p className="flex items-center justify-start text-3xl font-semibold">Sign Up and Enjoy it</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="flex items-center gap-4 text-white">*/}
      {/*  <h1 className="mb-4 text-4xl font-bold">Your Text Here</h1>*/}
      {/*  <p className="text-lg">More Text Goes Here</p>*/}
      {/*</div>*/}
      {/*<div className="flex items-center gap-4 text-white">*/}
      {/*  <h1 className="mb-4 text-4xl font-bold">Your Text Here</h1>*/}
      {/*  <p className="text-lg">More Text Goes Here</p>*/}
      {/*</div>*/}
    </div>
  );
}
