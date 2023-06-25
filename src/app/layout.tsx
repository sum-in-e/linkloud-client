import './globals.css';
import QueryProvider from '@/common/containers/QueryProvider';
import Header from '@/common/containers/layout/Header';
import MainContent from '@/common/containers/layout/MainContent';
import Footer from '@/common/containers/layout/Footer';
import ChakraUiProvider from '@/common/containers/ChakraUiProvider';
import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import GoogleAnalytics from '@/common/containers/GoogleAnalytics';

export const metadata = {
  title: 'Linkloud',
  description: LINKLOUD_SLOGAN,
  keywords: 'linkloud, link, manage links, save links',
  metadataBase: new URL('https://linkloud.co.kr'),
  alternates: {
    canonical: '/',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: 'Linkloud',
    description: LINKLOUD_SLOGAN,
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
    description: LINKLOUD_SLOGAN,
    card: 'Linkloud',
    images: {
      url: 'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1687269892/linkloud/emtygeehcgigfn9wlhw3.jpg',
      alt: 'Linkloud Image',
    },
  },
  // For PWA
  applicationName: 'Linkloud',
  manifest: 'https://linkloud.co.kr/manifest.json',
  appleWebApp: {
    title: 'Linkloud',
    statusBarStyle: 'black-translucent',
  },
  themeColor: 'black',
  icons: {
    icon: [
      { url: '/public/icons/favicon-512x512.png' },
      new URL('/public/icons/favicon-512x512.png', 'https://linkloud.co.kr'),
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.NEXT_PUBLIC_MODE === 'production';

  return (
    <html lang="ko">
      {isProduction && <GoogleAnalytics />}
      <body>
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
