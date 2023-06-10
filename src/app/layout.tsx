import QueryProvider from '@/common/containers/QueryProvider';
import './globals.css';
import Header from '@/common/containers/layout/Header';
import MainContent from '@/common/containers/layout/MainContent';
import Footer from '@/common/containers/layout/Footer';
import ChakraUiProvider from '@/common/containers/ChakraUiProvider';

export const metadata = {
  title: 'Linkloud',
  description: '링크를 저장하고 필요할 때 다시 찾아볼 수 있는 클라우드',
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
