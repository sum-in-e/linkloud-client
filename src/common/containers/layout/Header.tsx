'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '@chakra-ui/react';
import { BsList } from 'react-icons/bs';
import logo_v from '/public/images/logo_v.png';
import logo from '/public/images/logo.png';
import { usePageType } from '@/common/modules/hooks/usePageType';
import { useIsShowLayout } from '@/common/modules/hooks/useIsShowLayout';
import LinkSearchForm from '@/features/link/containers/SearchLinks/LinkSearchForm';
import { useOpen } from '@/common/modules/hooks/useOpen';
import MobileMenuDrawer from '@/common/containers/MobileMenuDrawer';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';

const Header = () => {
  const router = useRouter();
  const pageType = usePageType();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isHeaderVisible } = useIsShowLayout();
  const { isOpen, onClose, onOpen } = useOpen();

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

  const handleClickListButton = () => {
    onOpen();
  };

  return isHeaderVisible ? (
    <header className="fixed left-0 top-0 z-10 flex h-16 w-full items-center justify-between bg-white px-5 md:h-20 md:px-10">
      {isMobile && isOpen && <MobileMenuDrawer onClose={onClose} />}
      <button className="md:hidden" onClick={handleClickListButton}>
        <BsList size={28} />
      </button>

      <Image
        src={logo_v}
        alt="linkloud Logo"
        className="h-auto w-14 cursor-pointer md:w-[110px]"
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
          <Avatar
            onClick={handlePushToMyProfile}
            className="h-8 w-8 cursor-pointer md:h-9 md:w-9"
          />
        </div>
      )}
    </header>
  ) : null;
};

export default Header;
