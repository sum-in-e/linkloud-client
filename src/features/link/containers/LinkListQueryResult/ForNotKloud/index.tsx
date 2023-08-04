'use client';

import { usePagination } from '@/common/modules/hooks/usePagination';
import TitleAndCount from '@/features/link/containers/LinkListQueryResult/common/TitleAndCount';
import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { useSearchParams } from 'next/navigation';
import {
  NotKloudCategoryKeyType,
  notKloudCategory,
} from '@/features/kloud/modules/types/kloudType';
import SearchLinks from '@/features/link/containers/SearchLinks';
import { LinkListQueryResult } from '@/features/link/containers/LinkListQueryResult/common/LinkListQueryResult';

interface Props {
  category: NotKloudCategoryKeyType;
}

export const linkListLimit = 10;

const LinkListQueryResultForNotKloud = ({ category }: Props) => {
  const keyword = useSearchParams().get('keyword');

  const getRestParams = () => {
    switch (category) {
      case 'collection':
        return { myCollection: true };
      case 'uncategorized':
        return { kloudId: 0 };
      case 'unread':
        return { isRead: false };
      case 'search':
        return keyword !== null ? { keyword } : { keyword: '' };
      default:
        return null;
    }
  };

  const { offset, nextPage, previousPage, goToPage } = usePagination({
    limit: linkListLimit,
  });

  const { data, isLoading } = useGetLinkListQuery({
    offset,
    limit: linkListLimit,
    ...getRestParams(),
  });

  const count = data?.count || 0;

  const getTitle = () => {
    if (category === 'search' && keyword !== null) {
      // 검색인 경우
      return `"${keyword}"에 대한 검색 결과`;
    }
    return notKloudCategory[category];
  };

  // TODO: Title and count section 로딩 스켈레톤 적용 필요
  return (
    <LinkListQueryResult
      Header={
        <div>
          {category === 'search' && <SearchLinks />}
          <TitleAndCount title={getTitle()} count={count} />
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

export default LinkListQueryResultForNotKloud;
