'use client';

import Pagination from '@/common/components/Pagination';
import { usePagination } from '@/common/modules/hooks/usePagination';
import TitleAndCountParserForKloud from '@/features/link/containers/LinkListQueryResult/ForKloud/TitleAndCountParser';
import LinkList from '@/features/link/containers/LinkListQueryResult/common/LinkList';
import { LinkListLimit } from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';
import { LinkListQueryResultSection } from '@/features/link/components/LinkListQueryResultSection';

const LinkListQueryResultForKloud = () => {
  const { kloudId } = useParams();

  const { offset, nextPage, previousPage, goToPage } = usePagination({
    limit: LinkListLimit,
  });

  const isKloudIdANumber = !isNaN(toNumber(kloudId));
  const { data, isLoading } = useGetLinkListQuery(
    {
      offset,
      limit: LinkListLimit,
      kloudId: toNumber(kloudId),
    },
    { enabled: isKloudIdANumber }
  );

  const count = data?.count || 0;
  return (
    <LinkListQueryResultSection>
      <TitleAndCountParserForKloud />
      <div className="h-full overflow-scroll">
        <LinkList isLoading={isLoading} data={data} />
      </div>
      <div className="mt-5">
        <Pagination
          totalItems={count}
          limit={LinkListLimit}
          offset={offset}
          nextPage={nextPage}
          previousPage={previousPage}
          goToPage={goToPage}
        />
      </div>
    </LinkListQueryResultSection>
  );
};

export default LinkListQueryResultForKloud;
