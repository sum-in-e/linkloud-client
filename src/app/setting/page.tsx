import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import MySetting from '@/features/setting/containers';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';

export const metadata = {
  title: 'Linkloud | 마이페이지',
};

export default async function SettingPage() {
  // * 마이페이지는 로그인이 되지 않은 상태의 페이지에서 prefetch 되어서는 안 됩니다. 토큰이 없는 상태에서 해당 페이지 prefetch 시 isLogin은 false가 되어 로그인 페이지로 보내는 로직이 실행되지만 그렇게 보내졌을 때 로그인 페이지에서는 유저를 로그인된 상태로 여겨 마이페이지로 보내면서 무한루프가 돌게 됩니다.
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    return_to: '/setting',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return <MySetting />;
}
