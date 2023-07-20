'use client';

import { AuthMethodType } from '@/features/auth/common/modules/types/authType';
import Link from 'next/link';
import { RiKakaoTalkFill } from 'react-icons/ri';
import * as querystring from 'querystring';
import { useSearchParams } from 'next/navigation';

const KakaoButton = ({ type }: { type: AuthMethodType }) => {
  const params = useSearchParams();
  const returnUrl = params.get('return_to');

  const queryString = querystring.stringify({
    type,
    return_to: returnUrl || '/kloud',
  });

  // TODO: 걷어내기
  // const text =
  //   type === 'login' ? '카카오로 계속하기' : '카카오로 바로 시작하기';
  const text = '서비스 준비중입니다.';

  return (
    <section className="w-full">
      <button
        className="common-button gap-1 bg-[#FAE100] py-3  hover:bg-[#ffe81a]"
        disabled={true}
      >
        <RiKakaoTalkFill />
        <p className="text-sm font-bold text-black ">{text}</p>
      </button>
      {/* TODO: 위 버튼 지우고 아래꺼 활성화 */}
      {/* <Link
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/user/auth/kakao?${queryString}`}
      >
        <button
          className="common-button gap-1 bg-[#FAE100] py-3  hover:bg-[#ffe81a]"
          disabled={true}
        >
          <RiKakaoTalkFill />
          <p className="text-sm font-bold text-black ">{text}</p>
        </button>
      </Link> */}
    </section>
  );
};
export default KakaoButton;
