import { UserRound } from 'lucide-react';
import Image from 'next/image';

import { blurProps } from '@/lib/images';

interface Props {
  src: string | null;
  /** Placeholder shown until the photo has loaded. */
  blur?: string | null;
  name: string;
  size: number;
  className?: string;
  /** Skip lazy loading, for a photo that is on screen at first paint. */
  eager?: boolean;
}

export function PersonPhoto({ src, blur, name, size, className = '', eager }: Props) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-soft text-brand-muted ${className}`}
        style={{ width: size, height: size }}
        role="img"
        aria-label={name}
      >
        <UserRound className="size-1/2" aria-hidden />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      loading={eager ? 'eager' : 'lazy'}
      {...blurProps(blur)}
      className={`object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
