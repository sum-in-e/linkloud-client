'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GoogleAdsense = () => {
  const pathname = usePathname();
  const isShowAd =
    pathname === '/' || pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    const scriptId = 'google-adsense-script';

    // isShowAd가 true일 때 스크립트 추가
    if (isShowAd) {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.src =
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2646613755586698';
        script.async = true;
        script.id = scriptId;
        document.body.appendChild(script);
      }
    }
    // isShowAd가 false일 때 스크립트 제거
    else {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    }
  }, [isShowAd]);

  return null;
};

export default GoogleAdsense;
