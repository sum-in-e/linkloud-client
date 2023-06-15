import './globals.css';
import QueryProvider from '@/common/containers/QueryProvider';
import Header from '@/common/containers/layout/Header';
import MainContent from '@/common/containers/layout/MainContent';
import Footer from '@/common/containers/layout/Footer';
import ChakraUiProvider from '@/common/containers/ChakraUiProvider';
import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';

export const metadata = {
  title: 'Linkloud',
  description: LINKLOUD_SLOGAN,
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
  keywords: 'linkloud, link, manage links, save links',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
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
