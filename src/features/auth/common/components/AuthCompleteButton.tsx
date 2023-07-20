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
  // TODO: 걷어내기
  // const text = type === 'login' ? '로그인하기' : '가입 완료하기';
  const text = '서비스 준비중입니다.';

  return (
    <button
      type="submit"
      onClick={onClick}
      // disabled={isDisabled}
      disabled={true}
      className="common-button bg-primary py-3 font-bold text-white hover:bg-primary-darker focus:outline-none"
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};
export default AuthCompleteButton;
