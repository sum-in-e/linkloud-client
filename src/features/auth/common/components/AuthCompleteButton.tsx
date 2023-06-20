import { AuthMethodType } from '@/features/auth/common/modules/types/auth';
import Loader from '@/common/components/Loader';

interface Props {
  onClick: () => void;
  isDisabled: boolean;
  isLoading: boolean;
  type: AuthMethodType;
}

const AuthCompleteButton = ({
  onClick,
  isDisabled,
  isLoading,
  type,
}: Props) => {
  const text = type === 'login' ? '로그인하기' : '가입 완료하기';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="focus:shadow-outline flex w-full select-none items-center justify-center gap-1 rounded-2xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-darker focus:outline-none disabled:bg-gray-400"
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};
export default AuthCompleteButton;
