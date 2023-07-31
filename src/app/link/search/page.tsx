import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import LinkListQueryResultForNotKloud from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import SearchLinks from '@/features/link/containers/SearchLinks';
import SidebarLayout from '@/common/containers/layout/SidebarLayout';

export const metadata = {
  title: 'MyKloud | 검색',
};

export default async function MyKloudSearchPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    return_to: '/link/search',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  const keyword = searchParams.keyword;

  // undefined이면 검색 초기 화면
  return (
    <SidebarLayout>
      {!keyword ? (
        <SearchLinks />
      ) : (
        <LinkListQueryResultForNotKloud category="search" />
      )}
    </SidebarLayout>
  );
}
