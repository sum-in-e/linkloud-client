import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import LinkListQueryResultForNotKloud from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import SidebarLayout from '@/common/containers/layout/SidebarLayout';

export const metadata = {
  title: 'MyKloud | 미확인',
};

export default async function MyKloudUncheckedPage() {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    return_to: '/link/unchecked',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return (
    <SidebarLayout>
      <LinkListQueryResultForNotKloud category="unchecked" />
    </SidebarLayout>
  );
}
