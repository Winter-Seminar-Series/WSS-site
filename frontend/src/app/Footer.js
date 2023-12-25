// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-white text-center text-gray-700">
      <Timer />
      <div className="space-y-6 ps-28 pe-28">
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
        <div className="flex items-center justify-between text-gray-400 pb-4">
          <div className="flex items-center gap-4">
            <p className="mt-6 text-sm">About us</p>
            <p className="mt-6 text-sm">Contact</p>
            <p className="mt-6 text-sm">Privacy Policy</p>
            <p className="mt-6 text-sm">Sitemap</p>
            <p className="mt-6 text-sm">Terms of Use</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="mt-6 text-sm">© 2000-2021, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Timer(){
  return(
      <div
          className="relative bg-cover bg-no-repeat bg-center h-64 flex items-center justify-center"
          style={{ backgroundImage: 'url(/source/footer_rectangle.svg)' ,
            backgroundSize: '100% auto', // Adjust this line to control background size
          }}
      >
        <div className="absolute text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Your Text Here</h1>
          <p className="text-lg">More Text Goes Here</p>
        </div>
      </div>
  )
}