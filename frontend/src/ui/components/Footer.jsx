import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white pb-7 pt-14 text-gray-700">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center justify-between gap-y-4 max-md:flex-col">
          <Link href="/">
            <Image
              src="/source/wss_footer.svg"
              alt="Winter Seminar Series"
              width="71"
              height="47"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </Link>
          <a href="https://www.sharif.edu/" target="_blank">
            <Image
              src="/source/sut_footer.svg"
              alt="Sharif University of Technology"
              width="60"
              height="60"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://t.me/ssc_public" target="_blank">
            <Image
              src="/source/ssc_footer.svg"
              alt="Students' Scientific Chapter"
              width="95"
              height="46"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://ramzinex.com/" target="_blank">
            <Image
              src="/source/sponsors/ramzinex.png"
              alt="Ramzinex"
              width="100"
              height="40"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://goldika.ir/" target="_blank">
            <Image
              src="/source/sponsors/goldika.png"
              alt="Goldika"
              width="130"
              height="40"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://yektanet.com/" target="_blank">
            <Image
              src="/source/sponsors/yekta.svg"
              alt="Yektanet"
              width="100"
              height="40"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://quera.org/" target="_blank">
            <Image
              src="/source/sponsors/quera.svg"
              alt="Quera"
              width="100"
              height="40"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
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
        <div className="mb-8 grid grid-cols-1 items-start gap-7 sm:grid-cols-2 md:grid-cols-4">
          <a
            href="https://maps.app.goo.gl/oGLAVseFLrysarjG6"
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
            href="https://maps.app.goo.gl/oGLAVseFLrysarjG6"
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
                Azadi Street, Tehran, Iran
              </p>
            </div>
          </a>
          <a
            href="mailto:wss.sharif@gmail.com"
            className="flex items-center justify-start gap-2"
          >
            <img src="/source/email.svg" alt="Email" width="48" height="48" />
            <div className="space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Mail
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                wss.sharif@gmail.com
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
                +98 (021) 66 16 57 81
              </p>
            </div>
          </a>
        </div>
        <div className="flex-row-reverse items-center justify-between">
          <p className="text-right text-sm">
            {`© 2015-${new Date().getFullYear()}, All Rights Reserved`}
          </p>
        </div>
      </div>
    </footer>
  );
}
