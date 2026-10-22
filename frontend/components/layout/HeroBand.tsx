import Image from 'next/image';

/** The brand photo strip behind the navbar on inner pages; content cards overlap it from below. */
export function HeroBand() {
  return (
    <div className="relative h-72 bg-ink-deep md:h-96" aria-hidden>
      <Image src="/images/hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
    </div>
  );
}
