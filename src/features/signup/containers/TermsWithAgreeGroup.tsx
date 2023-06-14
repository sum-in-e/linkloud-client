'use client';

import { IoIosArrowForward } from 'react-icons/io';
import Checkbox from '@/features/signup/components/Checkbox';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormsValidationState } from '@/features/signup/modules/stores/signupStore';

function TermsWithAgreeGroup() {
  const [allChecked, setAllChecked] = useState(false);
  const [serviceChecked, setServiceChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const { formsValidationState, setFormsValidationState } =
    useFormsValidationState();

  const toast = useToast();

  const handleAllChange = () => {
    if (allChecked) {
      // 전체 약관 동의가 체크되어 있으면 모두 해제
      setAllChecked(false);
      setServiceChecked(false);
      setPrivacyChecked(false);
      setFormsValidationState({
        ...formsValidationState,
        isVerifiedTermsOfAgree: false,
      });
    } else {
      // 전체 약관 동의가 체크되어 있지 않으면 모두 체크
      setAllChecked(true);
      setServiceChecked(true);
      setPrivacyChecked(true);
      setFormsValidationState({
        ...formsValidationState,
        isVerifiedTermsOfAgree: true,
      });
    }
  };

  const handleServiceChange = () => {
    if (serviceChecked) {
      // 서비스 이용약관 동의가 체크되어 있으면 해제하고 전체 약관 동의도 해제
      setServiceChecked(false);
      if (allChecked) {
        setAllChecked(false);
        setFormsValidationState({
          ...formsValidationState,
          isVerifiedTermsOfAgree: false,
        });
      }
    } else {
      // 서비스 이용약관 동의가 체크되어 있지 않으면 체크하고 개인정보 수집 및 이용 동의도 체크되어 있으면 전체 약관 동의도 체크
      setServiceChecked(true);
      if (privacyChecked) {
        setAllChecked(true);
        setFormsValidationState({
          ...formsValidationState,
          isVerifiedTermsOfAgree: true,
        });
      }
    }
  };

  const handlePrivacyChange = () => {
    if (privacyChecked) {
      // 개인정보 수집 및 이용 동의가 체크되어 있으면 해제하고 전체 약관 동의도 해제
      setPrivacyChecked(false);
      if (allChecked) {
        setAllChecked(false);
        setFormsValidationState({
          ...formsValidationState,
          isVerifiedTermsOfAgree: false,
        });
      }
    } else {
      // 개인정보 수집 및 이용 동의가 체크되어 있지 않으면 체크하고 서비스 이용약관 동의도 체크되어 있으면 전체 약관 동의도 체크
      setPrivacyChecked(true);
      if (serviceChecked) {
        setAllChecked(true);
        setFormsValidationState({
          ...formsValidationState,
          isVerifiedTermsOfAgree: true,
        });
      }
    }
  };

  const handleClickServiceTerm = () => {
    toast({
      title: '기능 추가 예정입니다.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleClickPrivacyTerm = () => {
    toast({
      title: '기능 추가 예정입니다.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <Checkbox
        value="all"
        label="전체 약관 동의"
        checked={allChecked}
        onChange={handleAllChange}
      />
      <div className="ml-4 flex justify-between">
        <Checkbox
          value="service"
          label="서비스 이용약관 동의 (필수)"
          checked={serviceChecked}
          onChange={handleServiceChange}
        />
        <TermsButton onClick={handleClickServiceTerm} />
      </div>
      <div className="ml-4 flex justify-between">
        <Checkbox
          value="privacy"
          label="개인정보 수집 및 이용 동의 (필수)"
          checked={privacyChecked}
          onChange={handlePrivacyChange}
        />
        <TermsButton onClick={handleClickPrivacyTerm} />
      </div>
    </div>
  );
}

export default TermsWithAgreeGroup;

const TermsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex cursor-pointer items-center" onClick={onClick}>
      <p className="text-xs font-semibold text-gray-500">약관보기</p>
      <IoIosArrowForward className="fill-gray-500" />
    </div>
  );
};
