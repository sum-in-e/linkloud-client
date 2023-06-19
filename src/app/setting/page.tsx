import { NEED_LOGIN } from '@/common/modules/constants/auth';
import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionWithApiInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';

export const metadata = {
  title: 'Linkloud | 마이페이지',
  description: LINKLOUD_SLOGAN,
};

export default async function MyPage() {
  const isLogin = await getSessionWithApiInServer();

  if (!isLogin) {
    // * 로그인되지 않은 경우 로그인 페이지로 redirect
    const queryString = querystring.stringify({
      return_to: `/setting`,
      error: NEED_LOGIN,
    });

    redirect(`/login?${queryString}`);
  }

  // * 로그인된 경우 페이지 보여주기
  return <h1 className="md:text-2xl">마이페이지</h1>;
}
