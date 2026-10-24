import Script from 'next/script';

import { GA_TRACKING_ID } from '@/lib/analytics';

export function GoogleAnalytics() {
  return (
    // Idle-time: analytics must never compete with the page for the network or the main thread.
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_TRACKING_ID}');`}
      </Script>
    </>
  );
}
