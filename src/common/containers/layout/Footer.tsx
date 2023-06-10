'use client';

import { useToast } from '@chakra-ui/toast';
import { usePathname } from 'next/navigation';

function Footer() {
  const toast = useToast();
  const pathname = usePathname();

  const isShow = !pathname.includes('/mykloud'); // 마이클라우드 제외한 페이지 에서만 푸터 노출

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

  const 준비중안내 = () => {
    toast({
      title: '기능 추가 예정입니다.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return isShow ? (
    <footer className="relative flex w-full flex-col gap-10 bg-stone-900 px-6 py-6 md:px-20">
      <div className="flex w-full flex-col gap-10 md:flex-row">
        <div className="flex flex-col gap-4">
          <Title text="서비스" />
          <div className="flex flex-col gap-2">
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
          <Text text="서비스 이용약관" onClick={준비중안내} />
          <Text text="개인정보 처리방침" onClick={준비중안내} />
        </div>
      </div>
      <p className="text-sm text-zinc-500">
        copyright 2023. Linkloud All rights reservesd.
      </p>
    </footer>
  ) : null;
}

export default Footer;

const Title = ({ text }: { text: string }) => {
  return <h6 className="font-bold text-slate-300">{text}</h6>;
};

const Text = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <p
      className="cursor-pointer text-slate-500 hover:underline"
      onClick={onClick}
    >
      {text}
    </p>
  );
};
