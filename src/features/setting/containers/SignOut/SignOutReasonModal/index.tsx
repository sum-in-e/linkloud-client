'use client';
import SignOutForm from '@/features/setting/containers/SignOut/SignOutReasonModal/SignOutForm';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const SignOutReasonModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose} size="lg" isCentered isOpen={true}>
      <ModalOverlay />
      <ModalContent className="md:px-5">
        <ModalHeader className="pt-10 text-center">
          서비스 이용을 중단하시겠어요?
        </ModalHeader>
        <ModalBody className="pb-10">
          <section className="mb-10 flex flex-col items-center gap-3">
            <p className="text-sm">떠나신다니 아쉬워요🥲</p>
            <div>
              <p className="text-center text-xs">
                링클라우드 이용을 중단하는 이유를 들려주세요.
              </p>
              <p className="text-center text-xs">
                유저님의 피드백은 서비스를 발전시키는 힘이 됩니다.
              </p>
            </div>
          </section>
          <SignOutForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignOutReasonModal;
