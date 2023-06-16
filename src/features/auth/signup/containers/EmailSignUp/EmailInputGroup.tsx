'use client';
import { isValidEmail } from '@/common/modules/utils/validation';
import InputFormContainer from '@/features/auth/common/components/InputFormContainer';
import { useEmailState } from '@/features/auth/common/modules/stores/authStore';
import Loader from '@/features/auth/signup/components/Loader';
import Timer from '@/features/auth/signup/containers/EmailSignUp/ExpiredAtTimer';
import { useConfirmVerificationCodeMutation } from '@/features/auth/signup/modules/apiHooks/useConfirmVerificationCodeMutation';
import { usePostEmailVerificationCodeMutation } from '@/features/auth/signup/modules/apiHooks/usePostEmailVerificationCodeMutation';
import { useFormsValidationState } from '@/features/auth/signup/modules/stores/signupStore';
import { ChangeEvent, useEffect, useState } from 'react';

const EmailInputGroup = () => {
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { email, setEmail } = useEmailState();
  const [isValidatedEmail, setIsValidatedEmail] = useState(false);
  const [sendEmailError, setSendEmailError] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  const { formsValidationState, setFormsValidationState } =
    useFormsValidationState();

  const resetAll = () => {
    setIsSent(false);
    setIsVerified(false);
    setIsValidatedEmail(false);
    setVerificationCode('');
    setFormsValidationState({
      ...formsValidationState,
      isVerifiedEmail: false,
    });
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (isSent) {
      setIsSent(false);
      isResetSendEmail();
      isResetConfirmVerificationCode();
    }

    if (!isValidEmail(newEmail)) {
      setIsValidatedEmail(false);
    } else {
      setIsValidatedEmail(true);
    }

    if (isVerified) {
      resetAll();
    }
  };

  const handleChangeVerificationCode = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
    if (verificationCodeError) {
      setVerificationCodeError('');
    }
  };

  const {
    mutate: sendEmailMutate,
    data: sendEmailData,
    isSuccess: isSuccessSendEmail,
    isError: isErrorSendEmailMutation,
    isLoading: isLoadingSendEmail,
    reset: isResetSendEmail,
    error: sendEmailMutationError,
  } = usePostEmailVerificationCodeMutation();

  const {
    mutate: confirmVerificationCodeMutate,
    data: confirmVerificationCodeData,
    isSuccess: isSuccessConfirmVerificationCode,
    isError: isErrorConfirmVerificationCode,
    isLoading: isLoadingConfirmVerificationCode,
    reset: isResetConfirmVerificationCode,
    error: confirmVerificationCodeMutationError,
  } = useConfirmVerificationCodeMutation();

  const handleClickSendVerificationCode = () => {
    sendEmailMutate({ email });
    if (verificationCodeError) {
      setVerificationCodeError('');
    }
  };

  const handleClickCofirmVerificationCode = () => {
    confirmVerificationCodeMutate({ email, verificationCode });
  };

  useEffect(() => {
    if (isSuccessSendEmail) {
      setIsSent(true);
    }
  }, [isSuccessSendEmail]);

  useEffect(() => {
    if (isErrorConfirmVerificationCode) {
      const error = confirmVerificationCodeMutationError.response?.data;
      const errorMessage = error?.message || '인증에 실패하였습니다.';

      setVerificationCodeError(errorMessage);
    }
  }, [isErrorConfirmVerificationCode]);

  useEffect(() => {
    if (isErrorSendEmailMutation) {
      const error = sendEmailMutationError.response?.data;
      const errorMessage = error?.message || '이메일 발송에 실패하였습니다.';

      setSendEmailError(errorMessage);
    }
  }, [isErrorSendEmailMutation]);

  useEffect(() => {
    if (isSuccessConfirmVerificationCode) {
      setIsVerified(true);
      setFormsValidationState({
        ...formsValidationState,
        isVerifiedEmail: true,
      });
    }
  }, [isSuccessConfirmVerificationCode]);

  useEffect(() => {
    if (email.length > 0) {
      setEmail('');
    }
    if (verificationCode.length > 0) {
      setVerificationCode('');
    }
  }, []);

  const isShowTimer = !isVerified && sendEmailData;

  return (
    <div className="flex w-full flex-col gap-4">
      <InputFormContainer label="이메일*">
        <div className="flex w-full">
          <input
            type="text"
            name="email"
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
            onClick={handleClickSendVerificationCode}
            disabled={isVerified || !isValidatedEmail}
            className="w-2/5 rounded-r-2xl bg-gray-700 px-4 py-3 text-sm font-bold uppercase text-gray-100 hover:bg-gray-600 disabled:bg-gray-400"
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
        {isErrorSendEmailMutation && sendEmailError !== '' && (
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
            {isShowTimer && (
              <Timer expireTimestamp={sendEmailData.data.expiredAt} />
            )}
          </div>
          <button
            onClick={handleClickCofirmVerificationCode}
            disabled={isVerified || verificationCode.length < 6}
            className={`w-2/5 rounded-r-2xl bg-gray-700 px-4 py-3 text-sm font-bold uppercase text-gray-100 hover:bg-gray-600 ${
              isVerified
                ? 'disabled:bg-emerald-600  disabled:hover:bg-emerald-600'
                : 'disabled:bg-gray-400  disabled:hover:bg-gray-400'
            } `}
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
        {isErrorConfirmVerificationCode && verificationCodeError !== '' && (
          <p className="text-xs text-red-500">{verificationCodeError}</p>
        )}
      </InputFormContainer>
    </div>
  );
};

export default EmailInputGroup;
