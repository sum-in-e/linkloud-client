import Loader from '@/common/components/Loader';
import { useLogOutMutation } from '@/features/auth/common/modules/apiHooks/useLogOutMutation';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LogOutButton = () => {
  const toast = useToast();
  const router = useRouter();

  const { isLoading, isError, mutate, isSuccess } = useLogOutMutation();

  const handleClick = () => {
    mutate({});
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError) {
      toast({
        title: '로그아웃에 실패하였습니다. 다시 시도해 주세요.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isError, toast]);

  return (
    <button
      onClick={handleClick}
      className="focus:shadow-outline flex w-full select-none items-center justify-center gap-1 rounded-2xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-darker focus:outline-none"
    >
      {isLoading ? <Loader /> : '로그아웃'}
    </button>
  );
};

export default LogOutButton;
