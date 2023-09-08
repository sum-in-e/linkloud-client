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
import TitleAndCountLoadingUI from '@/features/link/containers/LinkListQueryResult/common/TitleAndCount/DataFetchUI/LoadingUI';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';

interface Props {
  category: NotKloudCategoryKeyType;
}

export const linkListLimit = 20;

const LinkListQueryResultForNotKloud = ({ category }: Props) => {
  const keyword = useSearchParams().get('keyword');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getRestParams = () => {
    switch (category) {
      case 'collection':
        return { myCollection: true };
      case 'uncategorized':
        return { kloudId: 0 };
      case 'unchecked':
        return { isChecked: false };
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

  return (
    <LinkListQueryResult
      Header={
        <div>
          {category === 'search' && isMobile && <SearchLinks />}
          {isLoading ? (
            <TitleAndCountLoadingUI />
          ) : (
            <TitleAndCount title={getTitle()} count={count} />
          )}
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
