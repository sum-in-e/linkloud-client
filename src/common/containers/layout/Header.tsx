'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BsList, BsFillPersonFill } from 'react-icons/bs';
import logo_v from '/public/images/logo_v.png';
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
            className="rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-lighter"
          >
            시작하기
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <div className="hidden w-80 md:block">
              <LinkSearchForm />
            </div>
            <Link href="/my/profile">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-400 p-1 md:h-10 md:w-10">
                <BsFillPersonFill className="h-full w-full fill-white" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  ) : null;
};

export default Header;
