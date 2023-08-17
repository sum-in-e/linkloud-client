'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const GoogleAdsense = () => {
  const pathname = usePathname();
  const [isLandingPage, setIsLandingPage] = useState(false);

  useEffect(() => {
    setIsLandingPage(pathname === '/');
  }, [pathname]);

  return isLandingPage ? (
    <Script
      async
      strategy="lazyOnload"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2646613755586698"
      crossOrigin="anonymous"
    ></Script>
  ) : null;
};

export default GoogleAdsense;
