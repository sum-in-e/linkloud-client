'use client';

import { useGetKloudByIdQuery } from '@/features/kloud/modules/apiHooks/useGetKloudByIdQuery';
import TitleAndCount from '@/features/link/containers/LinkListQueryResult/common/TitleAndCount';
import TitleAndCountLoadingUI from '@/features/link/containers/LinkListQueryResult/common/TitleAndCount/DataFetchUI/LoadingUI';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';

interface Props {
  count: number;
}

const TitleParser = ({ count }: Props) => {
  const { kloudId } = useParams();

  const { data, isLoading } = useGetKloudByIdQuery({
    id: toNumber(kloudId),
  });

  if (isLoading) {
    return <TitleAndCountLoadingUI />;
  }

  const title = data?.name || '클라우드';

  return <TitleAndCount title={title} count={count} />;
};
export default TitleParser;
