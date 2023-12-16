import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import LinkListQueryResultForNotKloud from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import LinkPageLayout from '@/common/containers/layout/LinkPageLayout';
import { NEED_LOGIN } from '@/common/modules/constants/auth';

export const metadata = {
  title: '링클라우드 | 나중에 볼 것',
};

export default async function MyKloudFollowingPage() {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    error: encodeURIComponent(NEED_LOGIN),
    return_to: '/link/following',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return (
    <LinkPageLayout>
      <LinkListQueryResultForNotKloud category="following" />
    </LinkPageLayout>
  );
}
