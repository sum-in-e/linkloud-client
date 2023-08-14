import { AuthMethodType } from '@/features/auth/common/modules/types/authType';
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
      type="submit"
      onClick={onClick}
      disabled={isDisabled}
      className="reset-button flex items-center justify-center rounded-2xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-darker focus:outline-none"
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};
export default AuthCompleteButton;
