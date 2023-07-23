'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/images/logo_v.png';
import { usePageType } from '@/common/modules/hooks/usePageType';
import { Avatar } from '@chakra-ui/react';
import Link from 'next/link';
import { useIsShowLayout } from '@/common/modules/hooks/useIsShowLayout';

const Header = () => {
  const router = useRouter();
  const pageType = usePageType();
  const { isHeaderVisible } = useIsShowLayout();

  const handlePushToDefaultPage = () => {
    if (pageType === 'private') {
      router.push('/kloud/all');
      return;
    }

    router.push('/');
  };

  const handlePushToSetting = () => {
    router.push('/setting');
  };

  return isHeaderVisible ? (
    <header className="fixed left-0 top-0 z-50 flex h-20 w-full justify-center bg-white">
      <div className="flex h-full w-full max-w-screen-xl items-center justify-between p-5">
        <Image
          src={logo}
          alt="linkloud Logo"
          className="h-auto w-[90px] cursor-pointer md:w-[120px]"
          onClick={handlePushToDefaultPage}
          priority
        />
        {pageType === 'public' ? (
          <Link
            href="/login"
            className="rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-lighter"
          >
            시작하기
          </Link>
        ) : (
          <Avatar
            size={'sm'}
            onClick={handlePushToSetting}
            className="cursor-pointer"
          />
        )}
      </div>
    </header>
  ) : null;
};

export default Header;
