'use client';

import { Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import logo from '/public/images/logo_v.png';
import { usePageType } from '@/common/modules/hooks/usePageType';
import { useIsShowLayout } from '@/common/modules/hooks/useIsShowLayout';
import LinkSearchForm from '@/features/link/containers/SearchLinks/LinkSearchForm';

const Header = () => {
  const router = useRouter();
  const pageType = usePageType();
  const { isHeaderVisible } = useIsShowLayout();

  const handlePushToDefaultPage = () => {
    if (pageType === 'private') {
      router.push('/link/all');
      return;
    }

    router.push('/');
  };

  const handlePushToMyProfile = () => {
    router.push('/my/profile');
  };

  const handlePushToSearch = () => {
    router.push('/link/search');
  };

  return isHeaderVisible ? (
    <header className="fixed left-0 top-0 z-10 flex h-20 w-full items-center justify-between bg-white px-10 py-5">
      <Image
        src={logo}
        alt="linkloud Logo"
        className="h-auto w-[90px] cursor-pointer md:w-[110px]"
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
        <div className="flex items-center gap-3">
          <div className="hidden w-80 md:block">
            <LinkSearchForm />
          </div>
          <button
            className="rounded-full bg-primary p-2 md:hidden"
            onClick={handlePushToSearch}
          >
            <BsSearch size={20} className="fill-white" />
          </button>
          <Avatar
            onClick={handlePushToMyProfile}
            className="h-9 w-9 cursor-pointer"
          />
        </div>
      )}
    </header>
  ) : null;
};

export default Header;
