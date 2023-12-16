import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import LinkListQueryResultForNotKloud from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import LinkPageLayout from '@/common/containers/layout/LinkPageLayout';
import { NEED_LOGIN } from '@/common/modules/constants/auth';

export const metadata = {
  title: '링클라우드 | 미분류',
};

export default async function MyKloudUncategorizedPage() {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    error: encodeURIComponent(NEED_LOGIN),
    return_to: '/link/uncategorized',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return (
    <LinkPageLayout>
      <LinkListQueryResultForNotKloud category="uncategorized" />
    </LinkPageLayout>
  );
}
