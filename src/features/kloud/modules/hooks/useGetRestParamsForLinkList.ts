import { toNumber } from 'lodash';
import { useParams, useSearchParams } from 'next/navigation';

export const useGetRestParamsForLinkList = () => {
  const params = useSearchParams();
  const keyword = params.get('keyword');

  const { group } = useParams();

  switch (group) {
    case 'collection':
      return { myCollection: true };
    case 'uncategorized':
      return { kloudId: 0 };
    case 'unread':
      return { isRead: false };
    case 'all':
      return keyword !== null ? { keyword } : null;
    default:
      return { kloudId: toNumber(group) };
  }
};
