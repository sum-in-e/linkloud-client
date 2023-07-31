'use client';

import Pagination from '@/common/components/Pagination';
import { usePagination } from '@/common/modules/hooks/usePagination';
import TitleAndCount from '@/features/link/containers/LinkListQueryResult/common/TitleAndCount';
import LinkList from '@/features/link/containers/LinkListQueryResult/common/LinkList';
import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { useSearchParams } from 'next/navigation';
import {
  NotKloudCategoryKeyType,
  notKloudCategory,
} from '@/features/kloud/modules/types/kloudType';
import SearchLinks from '@/features/link/containers/SearchLinks';
import { LinkListQueryResultSection } from '@/features/link/components/LinkListQueryResultSection';

interface Props {
  category: NotKloudCategoryKeyType;
}

export const LinkListLimit = 10;

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
    limit: LinkListLimit,
  });

  const { data, isLoading } = useGetLinkListQuery({
    offset,
    limit: LinkListLimit,
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
    <LinkListQueryResultSection>
      {/* TODO: Title and count section 로딩 스켈레톤 적용 필요 */}
      <div>
        {category === 'search' && <SearchLinks />}
        <TitleAndCount title={getTitle()} count={count} />
      </div>
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

export default LinkListQueryResultForNotKloud;
