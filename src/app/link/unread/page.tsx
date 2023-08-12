import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import LinkListQueryResultForNotKloud from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import SidebarLayout from '@/common/containers/layout/SidebarLayout';

export const metadata = {
  title: 'MyKloud | 미열람',
};

export default async function MyKloudUnreadPage() {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    return_to: '/link/unread',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return (
    <SidebarLayout>
      <LinkListQueryResultForNotKloud category="unread" />
    </SidebarLayout>
  );
}
