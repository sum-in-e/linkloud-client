import { useLogOutMutation } from '@/features/auth/common/modules/apiHooks/useLogOutMutation';
import { useToast } from '@chakra-ui/react';
import { BsDashCircle } from 'react-icons/bs';

const LogOutButton = () => {
  const toast = useToast();

  const { mutate } = useLogOutMutation();

  const handleClick = () => {
    mutate(
      {},
      {
        onSuccess: (data) => {
          toast({
            title: `로그아웃 되었습니다.`,
            status: 'success',
            duration: 500,
            isClosable: true,
            onCloseComplete: () => (window.location.href = '/'),
          });
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            toast({
              title: '로그아웃에 실패하였습니다. 다시 시도해 주세요.',
              status: 'warning',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="color-duration flex w-full items-center gap-3 rounded-md border px-2 py-3 text-sm font-semibold text-zinc-700"
    >
      <BsDashCircle size={15} className="fill-zinc-700" />
      로그아웃
    </button>
  );
};

export default LogOutButton;
