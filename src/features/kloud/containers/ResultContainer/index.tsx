'use client';

import { useGetRestParamsForLinkList } from '@/features/kloud/modules/hooks/useGetRestParamsForLinkList';
import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { usePagination } from '@/common/modules/hooks/usePagination';
import TitleAndCountSection from '@/features/kloud/containers/ResultContainer/TitleAndCountSection';
import LinkListSection from '@/features/kloud/containers/ResultContainer/LinkListSection';
import Pagination from '@/common/components/Pagination';

const LIMIT = 10;

const ResultContainer = () => {
  const { offset, nextPage, previousPage, goToPage } = usePagination({
    limit: LIMIT,
  });

  const restParams = useGetRestParamsForLinkList();

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
