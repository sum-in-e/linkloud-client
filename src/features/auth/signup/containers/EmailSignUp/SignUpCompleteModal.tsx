import { useOpen } from '@/common/modules/hooks/useOpen';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import Link from 'next/link';

const SignUpCompleteModal = () => {
  const { onClose } = useOpen();

  return (
    <Modal onClose={onClose} size="xs" isCentered isOpen={true}>
      <ModalOverlay />
      <ModalContent>
        <div className="flex flex-col items-center justify-center gap-5 px-5 py-10">
          <h1 className="text-xl font-bold">🎉 가입을 환영합니다! 🎉</h1>
          <p className="text-center">
            이제부터 Linkloud와 함께
            <br />
            손쉽게 링크를 관리해요!
          </p>

          <Link
            prefetch={false}
            href="/kloud"
            className="focus:shadow-outline flex w-full select-none items-center justify-center gap-1 rounded-2xl bg-primary py-[0.6rem]  font-bold text-white hover:bg-primary-darker focus:outline-none"
          >
            시작하기
          </Link>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SignUpCompleteModal;
