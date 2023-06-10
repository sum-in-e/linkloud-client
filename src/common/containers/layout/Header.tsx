'use client';

import { useRouter, usePathname } from 'next/navigation';

function Header() {
  // * 헤더도 디자인이 나와야 감이 잡히니까 정말 레이아웃만 잡아놓자.

  const router = useRouter();
  const pathname = usePathname();

  const handleClickLogo = () => {
    // 로고 클릭 시 랜딩 페이지로 가는 경우 -> 랜딩페이지, 회원가입, 로그인, 서비스소개에서 로그인 안 했을 경우
    // 로고 클릭 시 마이클라우드로 가는 경우 -> 마이클라우드, 마이페이지, 서비스 소개에서 로그인된 경우
    router.push('/');
  };

  const isShow =
    !pathname.includes('/mykloud') && !pathname.includes('/mypage'); // 마이클라우드, 마이페이지가 아닌 경우에만 헤더 노출

  return isShow ? (
    <header className="flex h-24 w-full items-center justify-between bg-slate-100 px-6 py-6 md:px-20">
      <picture>
        <img
          src="images/logo_v.png"
          alt="linkloud_logo"
          className="w-[120px] cursor-pointer "
          onClick={handleClickLogo}
        />
      </picture>
    </header>
  ) : null;
}

export default Header;
