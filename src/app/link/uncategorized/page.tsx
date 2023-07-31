import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import LinkListQueryResultForNotKloud from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import SidebarLayout from '@/common/containers/layout/SidebarLayout';

export const metadata = {
  title: 'MyKloud | 미분류',
};

export default async function MyKloudUncategorizedPage() {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    return_to: '/link/uncategorized',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return (
    <SidebarLayout>
      <LinkListQueryResultForNotKloud category="uncategorized" />
    </SidebarLayout>
  );
}
