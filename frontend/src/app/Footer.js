// components/Footer.js
export default function Footer() {
  return (
      <footer className="bg-white text-gray-700 p-3.5 md:p-10 text-center">
        <div className="space-y-6 mx-auto max-w-screen-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/source/sut_footer.svg" alt="Facebook" width="60" height="60" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/source/wss_footer.svg" alt="LinkedIn" width="71" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/source/ssc_footer.svg" alt="Instagram" width="95" />
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/source/facebook.svg" alt="Facebook" width="56" height="56" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/source/instagram.svg" alt="Instagram" width="56" height="56" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/source/linkedin.svg" alt="LinkedIn" width="56" height="56" />
              </a>
            </div>
          </div>
          <div className="space-y-1 mx-auto max-w-screen-lg">
            <p className="text-sm flex justify-start items-center">
              The event is held by the Student Scientific Chapter (SSC) of Computer
            </p>
            <p className="text-sm flex justify-start items-center">
              Engineering Department of Sharif University of Technology
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="https://www.google.com/maps/place/Sharif+University+of+Technology" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <img src="/source/location.svg" alt="Location" width="48" height="48" />
              <div className="space-y-1 mx-auto max-w-screen-lg">
                <p className="text-sm flex justify-start items-center">
                  Location
                </p>
                <p className="text-sm flex justify-start items-center">
                  Sharif University of Technology
                </p>
              </div>
            </a>
            <a href="https://www.google.com/maps/place/Sharif+University+of+Technology" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <img src="/source/more.svg" alt="Location" width="48" height="48" />
              <div className="space-y-1 mx-auto max-w-screen-lg">
                <p className="text-sm flex justify-start items-center">
                  Address
                </p>
                <p className="text-sm flex justify-start items-center">
                  Azadi Street, District 2, Tehran, Iran
                </p>
              </div>
            </a>
            <a href="mailto:wss@ce.sharif.edu" className="flex items-center justify-center gap-2">

              <img src="/source/email.svg" alt="Email" width="48" height="48" />
              <div className="space-y-1 mx-auto max-w-screen-lg">
                <p className="text-sm flex justify-start items-center">
                  Mail
                </p>
                <p className="text-sm flex justify-start items-center">
                  wss@ce.sharif.edu
                </p>
              </div>
            </a>
            <a href="tel:+9802166165781" className="flex items-center justify-center gap-2">
              <img src="/source/call.svg" alt="Phone" width="48" height="48" />
              <div className="space-y-1 mx-auto max-w-screen-lg">
                <p className="text-sm flex justify-start items-center">
                  Tel
                </p>
                <p className="text-sm flex justify-start items-center">
                  +98 (021) 66 16 57 8
                </p>
              </div>
            </a>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <div className="flex gap-4 items-center">
              <p className="text-sm mt-6">About us</p>
              <p className="text-sm mt-6">Contact</p>
              <p className="text-sm mt-6">Privacy Policy</p>
              <p className="text-sm mt-6">Sitemap</p>
              <p className="text-sm mt-6">Terms of Use</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm mt-6">© 2000-2021, All Rights Reserved</p>
            </div>
          </div>
        </div>

      </footer>
  );
}
