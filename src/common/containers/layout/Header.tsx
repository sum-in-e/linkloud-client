'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  // * 헤더도 디자인이 나와야 감이 잡히니까 정말 레이아웃만 잡아놓자.

  const router = useRouter();
  const pathname = usePathname();

  const handleClickLogo = () => {
    // 로고 클릭 시 랜딩 페이지로 가는 경우 -> 랜딩페이지, 회원가입, 로그인, 서비스소개에서 로그인 안 했을 경우
    // 로고 클릭 시 마이클라우드로 가는 경우 -> 마이클라우드, 마이페이지, 서비스 소개에서 로그인된 경우
    router.push('/');
  };

  const isShow = !pathname.includes('/kloud') && !pathname.includes('/setting');

  return isShow ? (
    <header className="flex h-24 w-full justify-center bg-slate-100">
      <div className="flex h-full w-full max-w-screen-xl items-center justify-between p-6">
        <Image
          width={120}
          height={40}
          alt="linkloud Logo"
          src="https://res.cloudinary.com/dqcgvbbv7/image/upload/v1686554950/linkloud/logo_v_avimgi.png"
          className="w-[110px] cursor-pointer "
          onClick={handleClickLogo}
        />
      </div>
    </header>
  ) : null;
};

export default Header;
