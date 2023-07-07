'use client';

import { useGetKloudByIdQuery } from '@/features/kloud/modules/apiHooks/useGetKloudByIdQuery';
import {
  GroupKeyType,
  groupMapper,
} from '@/features/kloud/modules/types/kloudType';
import { toNumber } from 'lodash';
import { useParams, useSearchParams } from 'next/navigation';

interface Props {
  count: number;
}

const TitleAndCountSection = ({ count }: Props) => {
  const params = useSearchParams();
  const keyword = params.get('keyword');

  const { group } = useParams();

  const isNotGroup = !Object.keys(groupMapper).includes(group);

  const { data, isLoading } = useGetKloudByIdQuery(
    {
      id: toNumber(group),
    },
    isNotGroup
  );

  const getTitle = () => {
    if (isNotGroup) {
      if (data) {
        return data.name;
      }
    } else {
      if (group === 'all' && keyword !== null) {
        // 검색인 경우
        return `"${keyword}"에 대한 검색 결과`;
      }
      return groupMapper[group as GroupKeyType];
    }

    return ''; // 임의로 url에 조회되지 않는 kloudId를 입력하거나, 서버 오류로 데이터가 안 내려오는 경우 등
  };

  const isShowLoading = isNotGroup && isLoading; // 유저의 클라우드이고 클라우드를 조회중일 때

  return (
    <section className="flex items-end gap-3">
      {isShowLoading ? (
        // TODO 조회중 스켈레톤 넣기
        <h1 className="text-2xl font-bold">조회중</h1>
      ) : (
        <h1 className="text-2xl font-bold">{getTitle()}</h1>
      )}

      <p className="text-xl font-semibold">{count}</p>
    </section>
  );
};

export default TitleAndCountSection;
