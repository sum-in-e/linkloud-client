'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';
import Checkbox from '@/features/auth/signup/components/Checkbox';

/**
 * @param  onChangeValidation(value:boolean) 👉 약관 동의 완료 여부를 변경하는 이벤트 함수
 */
function TermsWithAgreeForm({
  onChangeValidation,
}: {
  onChangeValidation: (value: boolean) => void;
}) {
  const [allChecked, setAllChecked] = useState(false);
  const [serviceChecked, setServiceChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const toast = useToast();

  const handleAllChange = () => {
    if (allChecked) {
      // 전체 약관 동의가 체크되어 있으면 모두 해제
      setAllChecked(false);
      setServiceChecked(false);
      setPrivacyChecked(false);
      onChangeValidation(false);
    } else {
      // 전체 약관 동의가 체크되어 있지 않으면 모두 체크
      setAllChecked(true);
      setServiceChecked(true);
      setPrivacyChecked(true);
      onChangeValidation(true);
    }
  };

  const handleServiceChange = () => {
    if (serviceChecked) {
      // 서비스 이용약관 동의가 체크되어 있으면 해제하고 전체 약관 동의도 해제
      setServiceChecked(false);
      if (allChecked) {
        setAllChecked(false);
        onChangeValidation(false);
      }
    } else {
      // 서비스 이용약관 동의가 체크되어 있지 않으면 체크하고 개인정보 수집 및 이용 동의도 체크되어 있으면 전체 약관 동의도 체크
      setServiceChecked(true);
      if (privacyChecked) {
        setAllChecked(true);
        onChangeValidation(true);
      }
    }
  };

  const handlePrivacyChange = () => {
    if (privacyChecked) {
      // 개인정보 수집 및 이용 동의가 체크되어 있으면 해제하고 전체 약관 동의도 해제
      setPrivacyChecked(false);
      if (allChecked) {
        setAllChecked(false);
        onChangeValidation(false);
      }
    } else {
      // 개인정보 수집 및 이용 동의가 체크되어 있지 않으면 체크하고 서비스 이용약관 동의도 체크되어 있으면 전체 약관 동의도 체크
      setPrivacyChecked(true);
      if (serviceChecked) {
        setAllChecked(true);
        onChangeValidation(true);
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

  useEffect(() => {
    if (allChecked) {
      setAllChecked(false);
    }
    if (serviceChecked) {
      setServiceChecked(false);
    }
    if (privacyChecked) {
      setPrivacyChecked(false);
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-[0.35rem]">
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

export default TermsWithAgreeForm;

const TermsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex cursor-pointer items-center" onClick={onClick}>
      <p className="text-xs font-semibold text-gray-500">약관보기</p>
      <IoIosArrowForward className="fill-gray-500" />
    </div>
  );
};
