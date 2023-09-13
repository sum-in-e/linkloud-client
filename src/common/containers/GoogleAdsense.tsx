'use client';

import Script from 'next/script';

const GoogleAdsense = () => {
  return (
    <Script
      async
      strategy="lazyOnload"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2646613755586698"
      crossOrigin="anonymous"
    ></Script>
  );
};

export default GoogleAdsense;
s;
