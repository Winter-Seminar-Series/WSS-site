import Image from 'next/image';

import { CURRENT_EDITION } from '@/lib/editions';
import { BACKDROP_QUALITY } from '@/lib/images';

interface Props {
  /** The edition's hero image (`Edition.heroImage`); pages outside an edition use the current one. */
  image?: string;
}

/** The brand photo strip behind the navbar on inner pages; content cards overlap it from below. */
export function HeroBand({ image = CURRENT_EDITION.heroImage }: Props) {
  return (
    <div className="relative h-72 bg-ink-deep md:h-96" aria-hidden>
      <Image src={image} alt="" fill preload sizes="100vw" quality={BACKDROP_QUALITY} className="object-cover" />
    </div>
  );
}
