import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Linkloud',
};

export default async function HomePage() {
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/kloud');
  }

  return (
    <>
      <h1 className="font-bold italic md:text-2xl">Linkloud Randing Page</h1>
      <div className="mt-4 flex flex-col gap-4">
        <Link href="/login">로그인으로 이동</Link>
        <Link href="/kloud">마이클라우드로 이동</Link>
        <Link href="/setting">마이페이지로 이동</Link>
      </div>
    </>
  );
}
