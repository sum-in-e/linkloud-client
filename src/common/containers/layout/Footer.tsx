'use client';

import { useIsShowLayout } from '@/common/modules/hooks/useIsShowLayout';
import { useToast } from '@chakra-ui/toast';
import { usePathname } from 'next/navigation';

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
    <footer className="flex w-full flex-col justify-center gap-10 bg-stone-900 px-10 py-5">
      <div className="flex w-full flex-col gap-10 md:flex-row">
        <div className="flex flex-col gap-4">
          <Title text="서비스" />
          <div className="flex flex-col gap-2">
            <Text
              text="사용 가이드"
              onClick={() =>
                window.open('https://www.craft.me/s/AGjkOZUm2mFTDE')
              }
            />
            <Text
              text="의견 들려주기"
              onClick={() => window.open('https://tally.so/r/wkl2B6')}
            />
            <Text
              text="문제점 알려주기"
              onClick={() => window.open('https://tally.so/r/wAzEeB')}
            />
            <Text
              text="서비스 발전에 도움주기"
              onClick={() => window.open('https://toss.me/linkloud')}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Title text="문의" />
          <div className="flex flex-col gap-2">
            <Text
              text="linkloud.official@gmail.com"
              onClick={handleClickCopyEmail}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Title text="Linkloud" />
        <div className="flex flex-col gap-2">
          <Text
            text="서비스 이용약관"
            onClick={() => window.open('https://www.craft.me/s/u150oK9QGBnX4U')}
          />
          <Text
            text="개인정보 처리방침"
            onClick={() => window.open('https://www.craft.me/s/CJKMGCcnuC5YDf')}
          />
        </div>
      </div>
      <p className="text-xs text-zinc-500">
        copyright {new Date().getFullYear()}. Linkloud All rights reservesd.
      </p>
    </footer>
  ) : null;
};

export default Footer;

const Title = ({ text }: { text: string }) => {
  return <h2 className="text-[15px] font-bold text-slate-300">{text}</h2>;
};

const Text = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <p
      className="cursor-pointer text-sm text-slate-500 hover:underline"
      onClick={onClick}
    >
      {text}
    </p>
  );
};
