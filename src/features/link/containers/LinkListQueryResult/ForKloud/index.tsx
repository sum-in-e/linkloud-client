'use client';

import { useParams } from 'next/navigation';
import { toNumber } from 'lodash';
import { usePagination } from '@/common/modules/hooks/usePagination';
import { linkListLimit } from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { LinkListQueryResult } from '@/features/link/containers/LinkListQueryResult/common/LinkListQueryResult';
import TitleParser from '@/features/link/containers/LinkListQueryResult/ForKloud/TitleParser';

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
      Header={<TitleParser count={data?.count || 0} />}
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
