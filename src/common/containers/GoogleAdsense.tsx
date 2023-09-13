'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GoogleAdsense = () => {
  const pathname = usePathname();
  const isShowAd =
    pathname === '/' || pathname === '/login' || pathname === '/signup';

  return isShowAd ? (
    <Script
      async
      strategy="beforeInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2646613755586698"
      crossOrigin="anonymous"
    ></Script>
  ) : null;
};

export default GoogleAdsense;
