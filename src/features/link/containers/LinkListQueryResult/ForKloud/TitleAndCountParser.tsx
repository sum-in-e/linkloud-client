'use client';

import { useGetKloudByIdQuery } from '@/features/kloud/modules/apiHooks/useGetKloudByIdQuery';
import TitleAndCount from '@/features/link/containers/LinkListQueryResult/common/TitleAndCount';
import TitleAndCountLoadingUI from '@/features/link/containers/LinkListQueryResult/common/TitleAndCount/DataFetchUI/LoadingUI';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';

const TitleAndCountParserForKloud = () => {
  const { kloudId } = useParams();

  const { data, isLoading } = useGetKloudByIdQuery({
    id: toNumber(kloudId),
  });

  if (isLoading) {
    return <TitleAndCountLoadingUI />;
  }

  const title = data?.name || '클라우드';
  const count = data?.linkCount || 0;

  return <TitleAndCount title={title} count={count} />;
};
export default TitleAndCountParserForKloud;
