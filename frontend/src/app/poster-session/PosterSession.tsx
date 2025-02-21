import React from 'react';
import Footer from '../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/components/Navbar';
import Timer from '../../ui/components/Timer';
import { isAuthenticated } from '../../lib/auth';
import path from 'path';
import fs from 'fs';
import MarkdownRenderer from '../../ui/components/MarkdownRenderer';

export default async function PosterSession() {
  const authenticated = await isAuthenticated();

  const markdownContent = fs.readFileSync(
    path.join(process.cwd(), 'public', 'posterSessionDescription.md'),
    'utf-8',
  );

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/Rectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[400px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex max-w-[1199px] flex-col items-start justify-center gap-8 px-[72px] py-[60px] shadow-2xl">
          <div className="ml-18 flex flex-row items-start justify-between self-stretch lg:max-w-[1055px] ">
            <div className="min-h-screen flex-col gap-2 ">
              <p className="text-[20px] font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
                Join our new competition
              </p>
              <div className={''}>
                <p className="text-[76px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
                  Poster Session
                </p>
              </div>
              <img
                className="aspect-[4 / 3] relative my-4 w-full max-w-md shrink-0 rounded-lg object-cover object-center"
                alt=""
                src={'/landing/posterSession.jpg'}
              />
              <MarkdownRenderer className={''} content={markdownContent} />

              <br />
              <hr className={'bg-black'} />
              <br />
            </div>
          </div>
        </div>
      </div>
      <Timer />
      <Footer />
    </>
  );
}
