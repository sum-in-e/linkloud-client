'use client';

import MenuGroups from '@/features/kloud/containers/MenuGroups';
import ResultContainer from '@/features/kloud/containers/ResultContainer';

import { useParams } from 'next/navigation';
import { toNumber } from 'lodash';
import { groupMapper } from '@/features/kloud/modules/types/kloudType';

const MyKloud = () => {
  // TODO: 로딩 UI

  const { group } = useParams();

  const isInvalidAccess =
    isNaN(toNumber(group)) && !Object.keys(groupMapper).includes(group)
      ? true
      : false;

  return (
    <div className="flex gap-2">
      <div className="flex min-h-screen flex-col border-r-[1px] border-gray-300 pr-2">
        <MenuGroups />
      </div>
      <div className="flex min-h-screen flex-col">
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
