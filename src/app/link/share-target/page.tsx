import LinkShareTarget from '@/features/link/containers/ShareTarget';
import axios from 'axios';
import { ReactNode } from 'react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export default async function LinkShareTargetPage({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  const { url } = searchParams;

  // TODO: 로그인 되어있는지 확인 필요 -> 안 되어 있으면 로그인 필요하다고 UI 보여주기 (굳이 로그인 기능까지 제공하진말고)

  if (!url || url === '') {
    // TODO: url 형식 이상한것도 조건에 넣기.. 뭐 공유하기 기능으로 하는 거니까 거의 그럴일이 없긴하지? 그래도 임의로 url 접근할 수 있으니 처리하자.
    return <div>비정상 접근 UI</div>;
  }

  try {
    // * url 정보 가져오기

    const { data } = await instance.post(`/link/analyze?url=${url}`);

    const link = {
      url: data.data.url,
      title: data.data.title,
      description: data.data.description,
      thumbnailUrl: data.data.thumbnailUrl,
    };

    return (
      <ShareTargetLayout>
        <LinkShareTarget link={link} />
      </ShareTargetLayout>
    );
  } catch (error) {
    // TODO: 에러 발생 시 에러 발생 UI return
    console.log(error);
  }
}

// 모바일 공유하기 시 보여지는 UI는 기존 layout과 스타일이 달라서 새로 생성
const ShareTargetLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-zinc-50 px-5 py-10">
      {children}
    </div>
  );
};
