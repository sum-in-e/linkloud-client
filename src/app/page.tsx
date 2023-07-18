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
        <Link
          href="/login"
          className="w-full rounded-2xl bg-primary px-4 py-3 text-center text-sm font-bold text-white hover:bg-primary-lighter md:w-fit"
        >
          지금 시작하기
        </Link>
      </div>
    </>
  );
}
