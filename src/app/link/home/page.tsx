import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import LinkPageLayout from '@/common/containers/layout/LinkPageLayout';
import LinkHome from '@/features/home';
import { NEED_LOGIN } from '@/common/modules/constants/auth';

export const metadata = {
  title: '링클라우드 | 홈',
};

export default async function MyKloudHomePage() {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    error: encodeURIComponent(NEED_LOGIN),
    return_to: '/link/home',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return (
    <LinkPageLayout>
      <LinkHome />
    </LinkPageLayout>
  );
}
