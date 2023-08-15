'use client';

import Image from 'next/image';
import { linkListLimit } from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import LinkItem from '@/features/link/containers/LinkListQueryResult/common/LinkList/LinkItem';
import { GetLinkListData } from '@/features/link/modules/apis/link';
import Pagination from '@/common/components/Pagination';
import linkle from '/public/images/linkle.png';
import LinkListLoadingUI from '@/features/link/containers/LinkListQueryResult/common/LinkList/DataFetchUI/LoadingUI';
import LinkListErrorUI from '@/features/link/containers/LinkListQueryResult/common/LinkList/DataFetchUI/ErrorUI';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useParams, usePathname } from 'next/navigation';
import { toNumber } from 'lodash';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';

interface Props {
  data?: GetLinkListData;
  isLoading: boolean;
  isEditMode: boolean;
  onSelectItem: (id: number) => void;
  selectedIds: number[];
  offset: number;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

const LinkList = ({
  data,
  isLoading,
  isEditMode,
  onSelectItem,
  selectedIds,
  offset,
  nextPage,
  previousPage,
  goToPage,
}: Props) => {
  const { kloudId } = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const queryClient = useQueryClient();

  const handleRefetch = () => {
    queryClient.refetchQueries(queryKeys.link.getLinkList());
    if (kloudId) {
      // kloudId가 있는 경우 클라우드의 링크 리스트를 요청 했으나 가져오지 못한 것.
      // 해당 요청이 실패했으면 해당 리스트 상단의 클라우드 타이틀을 가져오기 위한 API요청도 실패했을 가능성이 높기 때문에 리스트 refetch 시 함께 refetch 하여 갱신한다.
      queryClient.refetchQueries(
        queryKeys.kloud.getKloudById(toNumber(kloudId))
      );
    }
  };

  if (isLoading) {
    return <LinkListLoadingUI />;
  }

  if (!data) {
    return <LinkListErrorUI onRefetch={handleRefetch} />;
  }

  const { links, count } = data;

  const getEmptyListText = () => {
    switch (pathname) {
      case '/link/search':
        return '검색어를 포함하는 링크가 없어요!';
      case '/link/unread':
        return '대단해요! 모든 링크를 확인했어요👍';
      case '/link/uncategorized':
        return '대단해요! 모든 링크가 분류되었어요👍';
      default:
        return '링크를 저장할 준비가 됐어요!';
    }
  };

  return links.length === 0 ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <Image
        src={linkle}
        alt="linkloud Logo"
        className="h-auto w-28"
        priority
      />
      <h4 className="text-lg font-bold text-zinc-700">{getEmptyListText()}</h4>
    </div>
  ) : (
    <div className="flex h-full flex-col justify-between overflow-y-scroll">
      <ul
        className={`grid grid-rows-[1fr] gap-5`}
        style={{
          gridTemplateColumns: `repeat(auto-fill,minmax(${
            isMobile ? 'calc(50% - 10px)' : '270px'
          },1fr))`,
        }}
      >
        {links.map((link) => (
          <LinkItem
            key={link.id}
            link={link}
            isEditMode={isEditMode}
            isSelected={selectedIds.includes(link.id)}
            onSelectItem={onSelectItem}
          />
        ))}
      </ul>
      <div className="py-5">
        <Pagination
          totalItems={count}
          limit={linkListLimit}
          offset={offset}
          nextPage={nextPage}
          previousPage={previousPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};
export default LinkList;
