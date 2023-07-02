'use client';
import { isValidEmail } from '@/common/modules/utils/validation';
import InputFormContainer from '@/features/auth/common/components/InputFormContainer';
import { useEmailState } from '@/features/auth/common/modules/stores/authStore';
import Loader from '@/common/components/Loader';
import Timer from '@/features/auth/signup/containers/EmailSignUp/ExpiredAtTimer';
import { useConfirmVerificationCodeMutation } from '@/features/auth/signup/modules/apiHooks/useConfirmVerificationCodeMutation';
import { usePostEmailVerificationCodeMutation } from '@/features/auth/signup/modules/apiHooks/usePostEmailVerificationCodeMutation';
import { useFormsValidationState } from '@/features/auth/signup/modules/stores/signupStore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const EmailInputGroup = () => {
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { email, setEmail } = useEmailState();
  const [isValidatedEmail, setIsValidatedEmail] = useState(false);
  const [sendEmailError, setSendEmailError] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  const { setFormsValidationState } = useFormsValidationState();

  const resetAll = () => {
    setIsSent(false);
    setIsVerified(false);
    setVerificationCode('');
    setFormsValidationState({
      isVerifiedEmail: false,
    });
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // 에러 문구 있는 상태에서 이메일 수정하면 에러 문구들 리셋
    if (sendEmailError !== '') {
      setSendEmailError('');
    }
    if (verificationCodeError !== '') {
      setVerificationCodeError('');
    }

    if (isSent) {
      // 이미 이메일로 인증번호 보냈는데 이메일 수정하면 isSent(false)
      setIsSent(false);
    }

    // 이메일 형식 맞아야 버튼 enabled 처리하도록 하기 위한 상태값 관리
    if (!isValidEmail(newEmail)) {
      setIsValidatedEmail(false);
    } else {
      setIsValidatedEmail(true);
    }

    if (isVerified) {
      // 인증 다 끝났는데 이메일 수정하면 전부 리셋
      resetAll();
    }
  };

  const handleChangeVerificationCode = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
    if (verificationCodeError !== '') {
      setVerificationCodeError('');
    }
  };

  const {
    mutate: sendEmailMutate,
    data: sendEmailData,
    isLoading: isLoadingSendEmail,
  } = usePostEmailVerificationCodeMutation();

  const {
    mutate: confirmVerificationCodeMutate,
    isLoading: isLoadingConfirmVerificationCode,
  } = useConfirmVerificationCodeMutation();

  const handleClickSendVerificationCode = () => {
    sendEmailMutate(
      { email },
      {
        onSuccess: (data) => {
          if (sendEmailError !== '') {
            setSendEmailError('');
          }
          if (verificationCodeError !== '') {
            setVerificationCodeError('');
          }

          setIsSent(true);
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || '이메일 발송에 실패하였습니다.';

          setSendEmailError(message);
        },
      }
    );
  };

  const handleClickCofirmVerificationCode = () => {
    confirmVerificationCodeMutate(
      { email, verificationCode },
      {
        onSuccess: (data) => {
          setIsVerified(true);
          setFormsValidationState({ isVerifiedEmail: true });
        },
        onError: (error) => {
          const message =
            error.response?.data.message || '인증에 실패하였습니다.';

          setVerificationCodeError(message);
        },
      }
    );
  };

  useEffect(() => {
    setEmail('');
    setVerificationCode('');
  }, [setEmail]);

  const isShowTimer = !isVerified && isSent;

  return (
    <div className="flex w-full flex-col gap-4">
      <InputFormContainer label="이메일*">
        <div className="flex w-full">
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={handleChangeEmail}
            placeholder="id@example.com"
            className={`w-3/5 rounded-l-2xl rounded-r-none border-[1px] bg-stone-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 outline-none ${
              !isValidatedEmail && email.length > 0
                ? 'border-red-500'
                : 'border-stone-100'
            }`}
          />
          <button
            type="button"
            disabled={isVerified || !isValidatedEmail}
            className="w-2/5 rounded-r-2xl bg-gray-700 px-4 py-3 text-sm font-bold uppercase text-gray-100 hover:bg-gray-600 disabled:bg-gray-400"
            onClick={handleClickSendVerificationCode}
          >
            {isLoadingSendEmail ? (
              <Loader />
            ) : isSent ? (
              '재전송하기'
            ) : (
              '인증 번호 보내기'
            )}
          </button>
        </div>
        {sendEmailError !== '' && (
          <p className="text-xs text-red-500">{sendEmailError}</p>
        )}
      </InputFormContainer>
      <InputFormContainer label="인증번호*">
        <div className="flex w-full">
          <div
            className={`relative w-3/5 rounded-l-2xl  border-[1px] border-stone-100`}
          >
            <input
              type="number"
              name="verification code"
              disabled={isVerified}
              value={verificationCode}
              onChange={handleChangeVerificationCode}
              placeholder="인증번호를 입력해 주세요."
              className={`w-full rounded-l-2xl rounded-r-none bg-stone-100 py-3 pl-4  text-sm text-gray-800 placeholder-gray-500 outline-none ${
                isShowTimer ? 'pr-16' : 'pr-4'
              }`}
            />
            {isShowTimer && sendEmailData && (
              <Timer expireTimestamp={sendEmailData.data.expiredAt} />
            )}
          </div>
          <button
            type="button"
            disabled={!isSent || isVerified || verificationCode.length < 6}
            className={`w-2/5 rounded-r-2xl bg-gray-700 px-4 py-3 text-sm font-bold uppercase text-gray-100 hover:bg-gray-600 ${
              isVerified
                ? 'disabled:bg-emerald-600  disabled:hover:bg-emerald-600'
                : 'disabled:bg-gray-400  disabled:hover:bg-gray-400'
            } `}
            onClick={handleClickCofirmVerificationCode}
          >
            {isLoadingConfirmVerificationCode ? (
              <Loader />
            ) : isVerified ? (
              '인증 완료'
            ) : (
              '인증 완료하기'
            )}
          </button>
        </div>
        {verificationCodeError !== '' && (
          <p className="text-xs text-red-500">{verificationCodeError}</p>
        )}
      </InputFormContainer>
    </div>
  );
};

export default EmailInputGroup;
