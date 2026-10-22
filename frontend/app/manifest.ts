import type { MetadataRoute } from 'next';

import { editionThemeColor } from '@/lib/edition-theme';
import { CURRENT_EDITION } from '@/lib/editions';
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: editionThemeColor(CURRENT_EDITION),
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/og.png', sizes: '428x428', type: 'image/png', purpose: 'any' },
    ],
  };
}
