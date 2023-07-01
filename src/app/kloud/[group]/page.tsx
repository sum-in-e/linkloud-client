import { SuccessResponseType } from '@/common/modules/types/responseType';
import MyKloud from '@/features/kloud/containers';
import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

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
  return <MyKloud />;
}
