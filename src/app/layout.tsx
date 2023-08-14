import './globals.css';
import QueryProvider from '@/common/containers/QueryProvider';
import Header from '@/common/containers/layout/Header';
import MainContent from '@/common/containers/layout/MainContent';
import Footer from '@/common/containers/layout/Footer';
import ChakraUiProvider from '@/common/containers/ChakraUiProvider';
import { LINKLOUD_DESCRIPTION } from '@/common/modules/constants/brand';
import GoogleAnalytics from '@/common/containers/GoogleAnalytics';

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
  title: 'Linkloud',
  description: LINKLOUD_DESCRIPTION,
  keywords: 'linkloud, 링클라우드, link, manage links',
  metadataBase: new URL('https://linkloud.co.kr'),
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
    url: 'https://linkloud.co.kr',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1687269892/linkloud/emtygeehcgigfn9wlhw3.jpg',
        alt: 'Linkloud Image',
      },
    ],
  },
  twitter: {
    title: 'Linkloud',
    description: LINKLOUD_DESCRIPTION,
    card: 'Linkloud',
    images: {
      url: 'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1687269892/linkloud/emtygeehcgigfn9wlhw3.jpg',
      alt: 'Linkloud Image',
    },
  },
  // For PWA
  applicationName: 'Linkloud',
  manifest: 'https://linkloud.co.kr/manifest.json',
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
