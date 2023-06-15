import Loader from '@/features/auth/signup/components/Loader';

interface Props {
  onClick: () => void;
  isDisabled: boolean;
  isLoading: boolean;
}

const SignUpCompleteButton = ({ onClick, isDisabled, isLoading }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="focus:shadow-outline flex w-full select-none items-center justify-center gap-1 rounded-2xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-darker focus:outline-none disabled:bg-gray-400"
    >
      {isLoading ? <Loader /> : '가입 완료하기'}
    </button>
  );
};
export default SignUpCompleteButton;
