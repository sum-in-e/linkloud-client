import { SuccessResponseType } from '@/common/modules/types/responseType';
import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import MyKloud from '@/features/kloud/containers';
import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as querystring from 'querystring';

type Props = {
  params: { group: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const group = params.group;

  const getText = async () => {
    if (group === 'all') return '전체';
    if (group === 'unread') return '미열람';
    if (group === 'uncategorized') return '미분류';
    if (group === 'collection') return 'Collection';

    const cookie = cookies();
    const accessToken = cookie.get('sq')?.value;
    const refreshToken = cookie.get('bp')?.value;

    if (accessToken || refreshToken) {
      const response = await axios
        .get<
          SuccessResponseType<{
            id: number;
            name: string;
          }>
        >(`${process.env.NEXT_PUBLIC_BASE_URL}/kloud/${group}`, {
          withCredentials: true,
          headers: {
            Cookie: `sq=${accessToken}; bp=${refreshToken}`,
          },
        })
        .then((res) => res.data.data.name)
        .catch((error) => null);

      if (response) {
        return response;
      }
    }

    return group;
  };

  const text = await getText();

  return {
    title: `MyKloud | ${text}`,
  };
}

export default async function MyKloudPage() {
  // * 마이클라우드 페이지는 로그인이 되지 않은 상태의 페이지에서 prefetch 되어서는 안 됩니다. 토큰이 없는 상태에서 해당 페이지 prefetch 시 isLogin은 false가 되어 로그인 페이지로 보내는 로직이 실행되지만 그렇게 보내졌을 때 로그인 페이지에서는 유저를 로그인된 상태로 여겨 마이클라우드 페이지로 보내면서 무한루프가 돌게 됩니다.
  const isLogin = await getSessionWithJwtInServer();

  const queryString = querystring.stringify({
    return_to: '/kloud/all',
  });

  if (!isLogin) {
    redirect(`/login?${queryString}`);
  }

  return <MyKloud />;
}
