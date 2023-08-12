import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import LinkListQueryResultForNotKloud from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import SidebarLayout from '@/common/containers/layout/SidebarLayout';

export const metadata = {
  title: 'MyKloud | 전체',
};

export default async function MyKloudAllPage() {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    return_to: '/link/all',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return (
    <SidebarLayout>
      <LinkListQueryResultForNotKloud category="all" />
    </SidebarLayout>
  );
}
