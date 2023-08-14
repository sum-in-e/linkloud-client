import Loader from '@/common/components/Loader';
import { useLogOutMutation } from '@/features/auth/common/modules/apiHooks/useLogOutMutation';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const LogOutButton = () => {
  const toast = useToast();
  const router = useRouter();

  const { isLoading, mutate } = useLogOutMutation();

  const handleClick = () => {
    mutate(
      {},
      {
        onSuccess: (data) => {
          toast({
            title: '로그아웃 되었습니다.',
            status: 'success',
            duration: 1000,
            isClosable: true,
            onCloseComplete: () => router.push('/'),
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
      className="w-fit min-w-[90px] rounded-xl bg-gray-600 px-4 py-2 text-sm font-bold text-white hover:bg-gray-500"
    >
      {isLoading ? <Loader /> : '로그아웃'}
    </button>
  );
};

export default LogOutButton;
