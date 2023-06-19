import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionWithJWT } from '@/common/modules/utils/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Linkloud',
  description: LINKLOUD_SLOGAN,
};

export default async function HomePage() {
  const isLogin = await getSessionWithJWT();

  if (isLogin) {
    redirect('/my/all');
  }

  return (
    <>
      <h1 className="font-bold italic md:text-2xl">Linkloud Randing Page</h1>
      <div className="mt-4 flex flex-col gap-4">
        <Link href="/login">로그인으로 이동</Link>
        <Link href="/my/all">마이클라우드로 이동</Link>
        <Link href="/setting">마이페이지로 이동</Link>
      </div>
    </>
  );
}
