import './globals.css';
import Header from '@/common/containers/layout/Header';
import MainContent from '@/common/containers/layout/MainContent';
import Footer from '@/common/containers/layout/Footer';
import QueryProvider from '@/common/containers/provider/QueryProvider';
import ChakraUiProvider from '@/common/containers/provider/ChakraUiProvider';
import GoogleAnalytics from '@/common/containers/provider/GoogleAnalyticsProvider';
import {
  LINKLOUD_DESCRIPTION,
  LINKLOUD_OG_IMAGE_URL,
} from '@/common/modules/constants/brand';

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.NEXT_PUBLIC_MODE === 'production';

  return (
    <html lang="ko">
      {isProduction && <GoogleAnalytics />}
      <body className="box-border bg-zinc-50">
        <QueryProvider>
          <ChakraUiProvider>
            <Header />
            <MainContent>{children}</MainContent>
            <Footer />
          </ChakraUiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: '링클라우드 | Linkloud',
  description: LINKLOUD_DESCRIPTION,
  keywords: 'linkloud, 링클라우드, link, manage links',
  metadataBase: new URL('https://linkloud.xyz'),
  alternates: {
    canonical: '/',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'contain',
  },
  openGraph: {
    title: 'Linkloud',
    description: LINKLOUD_DESCRIPTION,
    url: 'https://linkloud.xyz',
    type: 'website',
    images: [
      {
        url: LINKLOUD_OG_IMAGE_URL,
        alt: 'Linkloud Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linkloud',
    description: LINKLOUD_DESCRIPTION,
    images: [
      {
        url: LINKLOUD_OG_IMAGE_URL,
        alt: 'Linkloud Image',
      },
    ],
  },
  // For PWA
  applicationName: 'Linkloud',
  manifest: 'https://linkloud.xyz/manifest.json',
  themeColor: 'white',
  appleWebApp: {
    title: 'Linkloud',
    statusBarStyle: 'default',
    startupImage: [
      {
        url: '/startup/apple-splash-750x1334.png',
        media: '(device-width: 375px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/startup/apple-splash-828x1792.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/startup/apple-splash-1125x2436.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/startup/apple-splash-1170x2532.png',
        media:
          '(device-width:390px) and (device-height:844px) and (-webkit-device-pixel-ratio:3)',
      },
      {
        url: '/startup/apple-splash-1242x2688.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:3)',
      },
      {
        url: '/startup/apple-splash-1284x2778.png',
        media:
          '(device-width:428px) and (device-height:926px) and (-webkit-device-pixel-ratio:3)',
      },
    ],
  },
};
