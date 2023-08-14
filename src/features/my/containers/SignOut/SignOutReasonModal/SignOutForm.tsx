import Loader from '@/common/components/Loader';
import { useSignOutMutation } from '@/features/auth/common/modules/apiHooks/useSignOutMutation';
import Checkbox from '@/features/auth/signup/components/Checkbox';
import {
  SIGN_OUT_REASON_TYPE,
  SignOutReasonType,
} from '@/features/my/modules/types/signoutType';
import { useToast } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

const SignOutForm = ({ onClose }: { onClose: () => void }) => {
  const toast = useToast();
  const router = useRouter();

  const reasons = [
    SIGN_OUT_REASON_TYPE.NOT_HELPFUL,
    SIGN_OUT_REASON_TYPE.INCONVENIENT,
    SIGN_OUT_REASON_TYPE.HARD_TO_MANAGE,
    SIGN_OUT_REASON_TYPE.LOW_ACCESSIBILITY,
    SIGN_OUT_REASON_TYPE.OTHERS,
  ];

  const [reasonCategory, setReasonCategory] = useState<SignOutReasonType>(
    SIGN_OUT_REASON_TYPE.NOT_HELPFUL
  );

  const [etcReason, setEtcReason] = useState('');

  const { isLoading, mutate } = useSignOutMutation();

  const handleChangeEtc = debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEtcReason(e.target.value);
  }, 200);

  const handleClickSignOut = () => {
    const reason =
      reasonCategory !== SIGN_OUT_REASON_TYPE.OTHERS
        ? reasonCategory
        : etcReason;

    if (!isLoading)
      mutate(
        { reason },
        {
          onSuccess: (data) => {
            toast({
              title: '회원 탈퇴 처리되었습니다.',
              status: 'success',
              duration: 2000,
              isClosable: true,
              onCloseComplete: () => {
                router.push('/');
              },
            });
          },
          onError: (error) => {
            const isNotServerError = error.response?.status !== 500;

            if (isNotServerError) {
              toast({
                title: '회원탈퇴에 실패하였습니다. 다시 시도해 주세요.',
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
    <section className="flex flex-col px-6">
      <div className="my-5 flex flex-col gap-2">
        <div className="flex flex-col gap-3 md:px-3">
          {reasons.map((reason) => (
            <Checkbox
              key={reason}
              value={reason}
              label={reason}
              checked={reasonCategory === reason}
              onChange={() => setReasonCategory(reason)}
            />
          ))}
        </div>
        <div className="w-full px-5">
          <textarea
            className="h-28 w-full resize-none rounded-xl bg-gray-100 p-2 px-2 text-sm focus:outline-none disabled:text-gray-500"
            onChange={handleChangeEtc}
            placeholder="탈퇴 사유를 입력해 주세요."
            disabled={reasonCategory !== SIGN_OUT_REASON_TYPE.OTHERS}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="common-button bg-black font-bold text-white hover:bg-zinc-700"
        >
          계속 이용하기
        </button>
        <button
          onClick={handleClickSignOut}
          className="common-button bg-red-500 font-bold text-white hover:bg-red-400"
        >
          {isLoading ? <Loader /> : '그만 이용하기'}
        </button>
      </div>
    </section>
  );
};

export default SignOutForm;
