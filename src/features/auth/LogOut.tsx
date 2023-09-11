import { useLogOutMutation } from '@/features/auth/common/modules/apiHooks/useLogOutMutation';
import { useToast } from '@chakra-ui/react';
import { BsDashCircle } from 'react-icons/bs';

const LogOutArea = () => {
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
            duration: 1000,
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
    <div className="md:mb-3 md:px-10">
      <button
        type="button"
        onClick={handleClick}
        className="color-duration flex w-full items-center gap-3 rounded-md border px-2 py-3 text-sm font-semibold text-zinc-700 md:w-fit md:rounded-full md:border-0 md:px-3 md:py-2 md:hover:bg-zinc-200"
      >
        <BsDashCircle size={15} className="fill-zinc-700" />
        로그아웃
      </button>
    </div>
  );
};

export default LogOutArea;
