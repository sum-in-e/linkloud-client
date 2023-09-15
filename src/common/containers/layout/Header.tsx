'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BsList, BsBoxArrowInRight } from 'react-icons/bs';
import logo_v from '/public/images/logo_v.png';
import { usePageType } from '@/common/modules/hooks/usePageType';
import { useIsShowLayout } from '@/common/modules/hooks/useIsShowLayout';
import LinkSearchForm from '@/features/link/containers/SearchLinks/LinkSearchForm';
import { useOpen } from '@/common/modules/hooks/useOpen';
import MobileMenuDrawer from '@/common/containers/MobileMenuDrawer';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';
import MobileProfile from '@/common/containers/MobileProfile';

const Header = () => {
  const router = useRouter();
  const pageType = usePageType();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isHeaderVisible } = useIsShowLayout();
  const { isOpen, onClose, onOpen } = useOpen();

  const handlePushToDefaultPage = () => {
    if (pageType === 'private') {
      router.push('/link/home');
      return;
    }

    router.push('/');
  };

  const handleClickListButton = () => {
    onOpen();
  };

  return isHeaderVisible ? (
    <header
      className={`fixed left-0 top-0 z-10 flex h-16 w-full justify-center bg-white px-4 md:h-20 md:px-10`}
    >
      <div
        className={`flex h-full w-full items-center justify-between ${
          pageType === 'public' && 'max-w-screen-xl'
        }`}
      >
        {pageType === 'private' && isMobile && isOpen && (
          <MobileMenuDrawer onClose={onClose} />
        )}
        {pageType === 'private' && (
          <button
            aria-label="Open Menu List"
            type="button"
            className="md:hidden"
            onClick={handleClickListButton}
          >
            <BsList size={28} />
          </button>
        )}

        <Image
          src={logo_v}
          alt="linkloud Logo"
          className="h-auto w-20 cursor-pointer md:w-28"
          onClick={handlePushToDefaultPage}
          priority
        />
        {pageType === 'public' ? (
          <Link
            href="/login"
            className="group/login flex items-center justify-center gap-3 rounded-full border-2 border-primary-alt border-opacity-80 bg-transparent px-4 py-2 hover:border-primary-alt-lighter hover:bg-primary-alt-lighter"
          >
            <BsBoxArrowInRight
              size={17}
              className="fill-primary-alt group-hover/login:fill-white"
            />
            <p className="text-sm font-bold text-primary-alt group-hover/login:text-white">
              Log in
            </p>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <div className="hidden w-80 md:block">
              <LinkSearchForm />
            </div>
            <div className="md:hidden">
              <MobileProfile />
            </div>
          </div>
        )}
      </div>
    </header>
  ) : null;
};

export default Header;
