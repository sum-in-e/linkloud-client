'use client';

import { useParams } from 'next/navigation';
import { toNumber } from 'lodash';
import { groupMapper } from '@/features/kloud/modules/types/kloudType';
import { useGetRestParams } from '@/features/kloud/modules/hooks/useGetRestParams';
import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { usePagination } from '@/common/modules/hooks/usePagination';
import TitleAndCountSection from '@/features/kloud/containers/ResultContainer/TitleAndCountSection';
import LinkListSection from '@/features/kloud/containers/ResultContainer/LinkListSection';
import Pagination from '@/common/components/Pagination';

const LIMIT = 10;

const ResultContainer = () => {
  const { group } = useParams();

  const isInvalidAccess =
    isNaN(toNumber(group)) && !Object.keys(groupMapper).includes(group)
      ? true
      : false;

  if (isInvalidAccess) {
    // TODO: 정상적인 클라우드 접근이 아니므로 해당 UI에 결과 없음 보여주기. 임의로 url에 텍스트를 쳐서 들어오는 경우를 위해
    return <p>데이터가 존재하지 않습니다.</p>;
  }

  const { offset, nextPage, previousPage, goToPage } = usePagination({
    limit: LIMIT,
  });

  const restParams = useGetRestParams();

  const { data, isLoading } = useGetLinkListQuery({
    offset,
    limit: LIMIT,
    ...restParams,
  });

  const count = data?.count || 0;

  return (
    <div>
      <TitleAndCountSection count={count} />
      <LinkListSection data={data} isLoading={isLoading} />
      {count > 0 && (
        <div className="mt-5">
          <Pagination
            totalItems={count}
            limit={LIMIT}
            offset={offset}
            nextPage={nextPage}
            previousPage={previousPage}
            goToPage={goToPage}
          />
        </div>
      )}
    </div>
  );
};

export default ResultContainer;
