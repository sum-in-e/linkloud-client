'use client';
import CustomModal from '@/common/components/CustomModal';
import SignOutForm from '@/features/my/containers/SignOut/SignOutReasonModal/SignOutForm';

const SignOutReasonModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <CustomModal onClose={onClose}>
      <div className="h-screen w-screen overflow-scroll bg-white py-8 md:h-fit md:w-fit md:rounded-lg md:px-16 md:py-5">
        <h4 className="text-center text-lg font-bold">
          서비스 이용을 중단하시겠어요?
        </h4>
        <section className="mb-3 flex flex-col items-center gap-3">
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
      </div>
    </CustomModal>
  );
};

export default SignOutReasonModal;
