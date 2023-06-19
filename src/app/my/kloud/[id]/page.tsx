import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionInSever } from '@/features/auth/common/modules/apis/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';

export const metadata = {
  title: 'Linkloud | MyKloud',
  description: LINKLOUD_SLOGAN,
};

const getSession = async () => {
  try {
    await getSessionInSever();
    return true;
  } catch (error) {}
  return false;
};

export default async function MyKloudIdPage({ params }: any) {
  const isLogin = await getSession();
  const id = params.id;

  if (!isLogin) {
    const queryString = querystring.stringify({
      return_to: `/my/kloud/${id}`,
      error: '로그인이 필요한 서비스입니다.',
    });
    redirect(`/login?${queryString}`);
  }
  return <h1 className="md:text-2xl">MyKloud</h1>;
}
