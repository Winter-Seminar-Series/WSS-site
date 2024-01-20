import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white pb-7 pt-14 text-gray-700">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center justify-between gap-y-4 max-md:flex-col">
          <Image
            src="/source/sut_footer.svg"
            alt="Facebook"
            width="60"
            height="60"
          />
          <Image
            src="/source/wss_footer.svg"
            alt="LinkedIn"
            width="71"
            height="47"
          />
          <Image
            src="/source/ssc_footer.svg"
            alt="Instagram"
            width="95"
            height="46"
          />
          <Image
            src="/source/sponsors/divar.svg"
            alt="Divar"
            width="69"
            height="40"
          />
          <Image
            src="/source/sponsors/quera.svg"
            alt="Quera"
            width="131"
            height="24"
          />
          <Image
            src="/source/sponsors/ramzinex.svg"
            alt="Ramzinex"
            width="140"
            height="32"
          />
          <Image
            src="/source/sponsors/bazar.svg"
            alt="Bazar"
            width="100"
            height="40"
          />
        </div>
        <div className="my-8 flex items-center justify-between gap-y-4 max-md:flex-col">
          <div className="max-md:text-center">
            <p className="max-w-prose text-sm">
              The event is held by the Student Scientific Chapter (SSC) of
              Computer Engineering Department of Sharif University of Technology
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/WSS_SUT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/socials/telegram.svg"
                alt="Telegram"
                width="56"
                height="56"
              />
            </a>
            <a
              href="https://www.instagram.com/wss_sut"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/socials/instagram.svg"
                alt="Instagram"
                width="56"
                height="56"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/wss-sut/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/socials/linkedin.svg"
                alt="LinkedIn"
                width="56"
                height="56"
              />
            </a>
            <a
              href="https://www.youtube.com/@WSS-SUT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/socials/youtube.svg"
                alt="Youtube"
                width="56"
                height="56"
              />
            </a>
            <a
              href="https://twitter.com/wss_sut"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/socials/twitter.svg"
                alt="Twitter"
                width="56"
                height="56"
              />
            </a>
          </div>
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
        <div className="flex-row-reverse items-center justify-between">
          <p className="text-right text-sm">
            © 2015-2024, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
