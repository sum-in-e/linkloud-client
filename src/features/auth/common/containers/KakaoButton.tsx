'use client';

import Link from 'next/link';
import { RiKakaoTalkFill } from 'react-icons/ri';

function KakaoButton({ type }: { type: 'login' | 'signup' }) {
  const text =
    type === 'login' ? '카카오로 계속하기' : '카카오로 바로 시작하기';

  return (
    <section className="w-full">
      <Link
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/user/auth/kakao?type=${type}`}
      >
        <button className="focus:shadow-outline flex w-full select-none items-center justify-center gap-1 rounded-2xl bg-[#FAE100] py-3  hover:bg-[#ffe81a] focus:outline-none">
          <RiKakaoTalkFill />
          <p className="text-sm font-bold text-black ">{text}</p>
        </button>
      </Link>
    </section>
  );
}
export default KakaoButton;
