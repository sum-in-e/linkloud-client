import { NEED_LOGIN } from '@/common/modules/constants/auth';
import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionWithApiInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';

export const metadata = {
  title: 'Linkloud | MyKloud',
  description: LINKLOUD_SLOGAN,
};

export default async function MyKloudByIdPage({ params }: any) {
  const isLogin = await getSessionWithApiInServer();
  const id = params.id;

  if (!isLogin) {
    // * 로그인되지 않은 경우 로그인 페이지로 redirect
    const queryString = querystring.stringify({
      return_to: `/my/kloud/${id}`,
      error: NEED_LOGIN,
    });

    redirect(`/login?${queryString}`);
  }

  // * 로그인된 경우 페이지 보여주기
  return <h1 className="md:text-2xl">MyKloud</h1>;
}
