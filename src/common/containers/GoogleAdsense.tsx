'use client';

import Script from 'next/script';

const GoogleAdsense = () => {
  const isRandingPage = window.location.pathname === '/';

  return isRandingPage ? (
    <Script
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2646613755586698"
      crossOrigin="anonymous"
    ></Script>
  ) : null;
};

export default GoogleAdsense;
