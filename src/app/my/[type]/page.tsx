import NotFoundPage from '@/app/not-found';
import { NEED_LOGIN } from '@/common/modules/constants/auth';
import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionWithApiInServer } from '@/common/modules/utils/session';
import { getSessionInSever } from '@/features/auth/common/modules/apis/session';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';

type GroupType = 'all' | 'uncategorized' | 'unread' | 'collection';

export const metadata = {
  title: 'Linkloud | MyKloud',
  description: LINKLOUD_SLOGAN,
};

export default async function MyKloudPage({ params }: any) {
  const type = params.type as GroupType;
  const isLogin = await getSessionWithApiInServer();

  if (!isLogin) {
    // * 로그인되지 않은 경우 로그인 페이지로 redirect
    const returnToUrl =
      type === 'all' ||
      type === 'collection' ||
      type === 'uncategorized' ||
      type === 'unread'
        ? `/my/${type}`
        : '/my/all';

    const queryString = querystring.stringify({
      return_to: returnToUrl,
      error: NEED_LOGIN,
    });

    redirect(`/login?${queryString}`);
  }

  // * 로그인된 경우 페이지 보여주기
  if (type === 'all') {
    return <h1 className="md:text-2xl">전체</h1>;
  }
  if (type === 'collection') {
    return <h1 className="md:text-2xl">내 컬렉션</h1>;
  }
  if (type === 'uncategorized') {
    return <h1 className="md:text-2xl">미분류</h1>;
  }
  if (type === 'unread') {
    return <h1 className="md:text-2xl">미열람</h1>;
  }

  // * 지정된 type이 아닌 경우 404 UI 보여주기
  return <NotFoundPage />;
}
