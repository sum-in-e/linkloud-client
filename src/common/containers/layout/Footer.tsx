'use client';

import Link from 'next/link';
import { useToast } from '@chakra-ui/toast';
import { useIsShowLayout } from '@/common/modules/hooks/useIsShowLayout';

const Footer = () => {
  const toast = useToast();

  const { isFooterVisible } = useIsShowLayout();

  const handleClickCopyEmail = async () => {
    try {
      await window.navigator.clipboard.writeText('linkloud.official@gmail.com');

      toast({
        title: '이메일 주소가 복사되었습니다',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: '이메일 주소 복사에 실패했습니다. 다시 시도해 주세요.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return isFooterVisible ? (
    <footer className="flex w-full flex-col items-center justify-between gap-5 px-4 py-10 md:flex-row md:px-10">
      <ul className="flex flex-wrap items-center gap-6">
        <LinkMenu
          text="Terms of Use"
          href="https://www.craft.me/s/u150oK9QGBnX4U"
        />
        <LinkMenu
          text="Privacy Policy"
          href="https://www.craft.me/s/CJKMGCcnuC5YDf"
        />
        <LinkMenu
          text="Help & Info"
          href="https://www.craft.me/s/AGjkOZUm2mFTDE"
        />
        <li
          onClick={handleClickCopyEmail}
          className="text-md cursor-pointer text-zinc-700 md:hover:text-primary-alt"
        >
          Contact
        </li>
      </ul>
      <p className="text-md text-zinc-700">
        © {new Date().getFullYear()} Linkloud
      </p>
    </footer>
  ) : null;
};

export default Footer;

const LinkMenu = ({ text, href }: { text: string; href: string }) => {
  return (
    <li>
      <Link
        href={href}
        target="_blank"
        className="text-md cursor-pointer whitespace-nowrap text-zinc-700 md:hover:text-primary-alt"
      >
        {text}
      </Link>
    </li>
  );
};
