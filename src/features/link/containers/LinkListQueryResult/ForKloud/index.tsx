'use client';

import Pagination from '@/common/components/Pagination';
import { usePagination } from '@/common/modules/hooks/usePagination';
import TitleAndCountParserForKloud from '@/features/link/containers/LinkListQueryResult/ForKloud/TitleAndCountParser';
import LinkList from '@/features/link/containers/LinkListQueryResult/common/LinkList';
import { linkListLimit } from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';
import { LinkListQueryResult } from '@/features/link/containers/LinkListQueryResult/common/LinkListQueryResult';

const LinkListQueryResultForKloud = () => {
  const { kloudId } = useParams();

  const { offset, nextPage, previousPage, goToPage } = usePagination({
    limit: linkListLimit,
  });

  const isKloudIdANumber = !isNaN(toNumber(kloudId));
  const { data, isLoading } = useGetLinkListQuery(
    {
      offset,
      limit: linkListLimit,
      kloudId: toNumber(kloudId),
    },
    { enabled: isKloudIdANumber }
  );

  return (
    <LinkListQueryResult
      Header={
        <div>
          <TitleAndCountParserForKloud />
        </div>
      }
      isLoading={isLoading}
      data={data}
      offset={offset}
      nextPage={nextPage}
      previousPage={previousPage}
      goToPage={goToPage}
    />
  );
};

export default LinkListQueryResultForKloud;
