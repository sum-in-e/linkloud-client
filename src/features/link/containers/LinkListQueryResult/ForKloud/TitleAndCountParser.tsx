'use client';

import { useGetKloudByIdQuery } from '@/features/kloud/modules/apiHooks/useGetKloudByIdQuery';
import TitleAndCount from '@/features/link/containers/LinkListQueryResult/common/TitleAndCount';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';

const TitleAndCountParserForKloud = () => {
  const { kloudId } = useParams();
  const isKloudIdANumber = !isNaN(toNumber(kloudId));

  const { data, isLoading } = useGetKloudByIdQuery({
    id: toNumber(kloudId),
  });

  if (isLoading) {
    //  TODO: Title and count section 로딩 스켈레톤 적용 필요
    return <div />;
  }

  if (!data) {
    return <div />;
  }

  const { name, linkCount } = data;

  return <TitleAndCount title={name} count={linkCount} />;
};
export default TitleAndCountParserForKloud;
