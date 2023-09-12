'use client';

import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { usePatchLinkCountMutation } from '@/features/link/modules/apiHooks/usePatchLinkCountMutation';
import { useQueryClient } from '@tanstack/react-query';

interface UseOpenLinkProps {
  id: number;
  url: string;
}

export const useOpenLink = ({ id, url }: UseOpenLinkProps) => {
  const { mutate: linkCountMutate } = usePatchLinkCountMutation();

  const queryClient = useQueryClient();

  const openLinkInNewTap = () => {
    linkCountMutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
        },
      }
    );

    window.open(url, '_blank');
  };

  return { openLinkInNewTap };
};
