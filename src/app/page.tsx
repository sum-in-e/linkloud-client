import { LINKLOUD_SLOGAN } from '@/common/constants/brand';

export const metadata = {
  title: 'Linkloud',
  description: LINKLOUD_SLOGAN,
};

export default function HomePage() {
  // TODO: 로그인 했으면 마이클라우드 페이지로 보내기
  return (
    <h1 className="font-bold italic md:text-2xl">Linkloud Randing Page</h1>
  );
}
