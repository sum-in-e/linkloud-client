import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import Link from 'next/link';

export const metadata = {
  title: 'Linkloud',
  description: LINKLOUD_SLOGAN,
};

export default function HomePage() {
  // TODO: 로그인 했으면 마이클라우드 페이지로 보내기
  return (
    <div>
      <h1 className="font-bold italic md:text-2xl">Linkloud Randing Page</h1>
      <div className="mt-4 flex flex-col gap-4">
        <Link href="/login">로그인으로 이동</Link>
        <Link href="/mykloud">마이클라우드로 이동</Link>
        <Link href="/mypage">마이페이지로 이동</Link>
      </div>
    </div>
  );
}
