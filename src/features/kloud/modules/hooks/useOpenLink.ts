import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { usePatchLinkReadMutation } from '@/features/link/modules/apiHooks/usePatchLinkReadMutation';
import { useQueryClient } from '@tanstack/react-query';

interface UseOpenLinkProps {
  id: number;
  url: string;
  isRead: boolean;
}

export const useOpenLink = ({ isRead, id, url }: UseOpenLinkProps) => {
  const { mutate: linkReadMutate } = usePatchLinkReadMutation();

  const queryClient = useQueryClient();

  const openLinkInNewTap = () => {
    if (!isRead) {
      // 미확인 링크를 클릭한 경우에만 열람 처리
      linkReadMutate(
        { id },
        {
          onSuccess: () => {
            // 열람 처리 성공하면 링크 리스트 새로고침해야 미확인에서는 링크 사라지고 미확인 UI도 사라지게 됨
            queryClient.invalidateQueries(queryKeys.link.getLinkList());
            queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          },
        }
      );
    }

    window.open(url, '_blank');
  };

  return { openLinkInNewTap };
};
