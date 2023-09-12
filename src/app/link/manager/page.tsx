import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import SidebarLayout from '@/common/containers/layout/SidebarLayout';
import { NEED_LOGIN } from '@/common/modules/constants/auth';
import LinkManager from '@/features/linkManager/containers/LinkManager';

export const metadata = {
  title: 'MyKloud | 링크 관리 매니저',
};

export default async function MyKloudLinkManagerPage() {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    error: encodeURIComponent(NEED_LOGIN),
    return_to: '/link/manager',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return (
    <SidebarLayout>
      <LinkManager />
    </SidebarLayout>
  );
}
