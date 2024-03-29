import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';
import LinkListQueryResultForNotKloud from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import SearchLinks from '@/features/link/containers/SearchLinks';
import LinkPageLayout from '@/common/containers/layout/LinkPageLayout';
import { NEED_LOGIN } from '@/common/modules/constants/auth';

export const metadata = {
  title: '링클라우드 | 검색',
};

export default async function MyKloudSearchPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    error: encodeURIComponent(NEED_LOGIN),
    return_to: '/link/search',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  const keyword = searchParams.keyword;
  // undefined이면 검색 초기 화면
  return (
    <LinkPageLayout>
      {keyword === undefined ? (
        <SearchLinks />
      ) : (
        <LinkListQueryResultForNotKloud category="search" />
      )}
    </LinkPageLayout>
  );
}
