'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useOpen } from '@/common/modules/hooks/useOpen';
import MenuGroups from '@/features/kloud/containers/MenuGroups';
import ResultContainer from '@/features/kloud/containers/ResultContainer';
import CreateLink from '@/features/link/containers/CreateLink';
import { useParams } from 'next/navigation';
import { toNumber } from 'lodash';
import { groupMapper } from '@/features/kloud/modules/types/kloudType';
import { checkNotificationSubscription } from '@/common/modules/utils/subscription';

const MyKloud = () => {
  // TODO: 로딩 UI

  const { onClose, isOpen, onOpen } = useOpen();

  const { group } = useParams();

  const isInvalidAccess =
    isNaN(toNumber(group)) && !Object.keys(groupMapper).includes(group)
      ? true
      : false;

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    console.log('서비서워커 동작 가능');

    // navigator.serviceWorker.ready.then((sw) => {
    //   console.log('서비스워커 등록됨', sw);
    // });

    if (navigator.serviceWorker.controller) {
      // 서비스워커가 이미 등록되어 있음
      console.log('Service Worker is already registered.');
      // 서비스워커가 활성화되면 ready 프로미스가 resolve됨
      navigator.serviceWorker.ready.then((sw) => {
        console.log('서비스워커 is ready', sw);
      });
    } else {
      // 서비스워커가 등록되어 있지 않음 -> 서비스워커 등록
      console.log('Service Worker is not registered.');
      navigator.serviceWorker.register('/sw.js').then((sw) => {
        console.log('서비스워커 등록 완료', sw);
      });
    }

    // checkNotificationSubscription(); // 알림 구독 확인
  }, []);

  return (
    <div className="flex gap-2">
      <div className="flex min-h-screen flex-col border-r-[1px] border-gray-300 pr-2">
        <MenuGroups />
      </div>
      <div className="flex min-h-screen flex-col">
        <div className="flex gap-2">
          <button
            type="button"
            className="common-button w-[300px] bg-gray-700 font-bold text-white"
            onClick={() => onOpen()}
          >
            링크 추가하기
          </button>
          <Link
            href="/setting"
            className="common-button w-[300px] bg-gray-700 font-bold text-white"
          >
            마이페이지로 가기(임시버튼)
          </Link>
          {isOpen && <CreateLink onClose={onClose} />}
        </div>
        {isInvalidAccess ? (
          // TODO: 정상적인 클라우드 접근이 아니므로 해당 UI에 결과 없음 보여주기. 임의로 url에 텍스트를 쳐서 들어오는 경우를 위해
          <p>데이터가 존재하지 않습니다.</p>
        ) : (
          <ResultContainer />
        )}
      </div>
    </div>
  );
};

export default MyKloud;
