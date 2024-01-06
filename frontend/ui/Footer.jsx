import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white pb-7 pt-14 text-gray-700">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center justify-between gap-y-4 max-md:flex-col">
          <div className="flex items-center gap-4">
            <img
              src="/source/sut_footer.svg"
              alt="Facebook"
              width="60"
              height="60"
            />
            <img src="/source/wss_footer.svg" alt="LinkedIn" width="71" />
            <img src="/source/ssc_footer.svg" alt="Instagram" width="95" />
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
        <div className="mb-10 mt-4 max-md:text-center">
          <p className="max-w-prose text-sm">
            The event is held by the Student Scientific Chapter (SSC) of
            Computer Engineering Department of Sharif University of Technology
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 md:grid-cols-4">
          <a
            href="https://www.google.com/maps/place/Sharif+University+of+Technology"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start gap-2"
          >
            <img
              src="/source/footer-location.svg"
              alt="Location"
              width="48"
              height="48"
            />
            <div className="space-y-1">
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
            className="flex items-center justify-start gap-2"
          >
            <img src="/source/more.svg" alt="Location" width="48" height="48" />
            <div className="space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Address
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                Azadi Street, District 2, Tehran, Iran
              </p>
            </div>
          </a>
          <a
            href="mailto:wss@ce.sharif.edu"
            className="flex items-center justify-start gap-2"
          >
            <img src="/source/email.svg" alt="Email" width="48" height="48" />
            <div className="space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Mail
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                wss@ce.sharif.edu
              </p>
            </div>
          </a>
          <a
            href="tel:+9802166165781"
            className="flex items-center justify-start gap-2"
          >
            <img src="/source/call.svg" alt="Phone" width="48" height="48" />
            <div className="space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Tel
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                +98 (021) 66 16 57 8
              </p>
            </div>
          </a>
        </div>
        <div className="flex items-center justify-between gap-y-4 pb-4 text-lightslategray max-md:flex-col">
          <div className="flex items-center max-md:w-full max-md:flex-col max-md:items-start md:gap-4">
            <Link href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">About us</p>
            </Link>
            <Link href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">Contact</p>
            </Link>
            <Link href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">Privacy Policy</p>
            </Link>
            <Link href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">Sitemap</p>
            </Link>
            <Link href="" className="flex items-center justify-center gap-2">
              <p className="mt-4 text-sm">Terms of Use</p>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <p className="mt-6 text-sm">© 2015-2024, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
