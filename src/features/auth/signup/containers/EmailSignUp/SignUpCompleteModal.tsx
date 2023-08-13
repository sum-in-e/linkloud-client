import CustomModal from '@/common/components/CustomModal';
import { useOpen } from '@/common/modules/hooks/useOpen';
import Link from 'next/link';

const SignUpCompleteModal = () => {
  const { onClose } = useOpen();

  return (
    <CustomModal onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-white px-10 py-7">
        <h2 className="text-xl font-bold">🎉 가입을 환영합니다! 🎉</h2>
        <p className="text-center">
          이제부터 Linkloud와 함께
          <br />
          손쉽게 링크를 관리해요!
        </p>

        <Link
          href="/link/all"
          className="reset-button flex w-full select-none items-center justify-center rounded-2xl bg-primary py-[0.6rem] font-bold text-white hover:bg-primary-darker"
        >
          시작하기
        </Link>
      </div>
    </CustomModal>
  );
};

export default SignUpCompleteModal;
