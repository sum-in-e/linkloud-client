import { GetLinkListParams } from '@/features/link/modules/apis/link';

const queryKeys = {
  user: {
    getSession: ['getSession'] as const,
  },
  link: {
    getLinkList: (params?: GetLinkListParams) =>
      params ? (['getLinkList', params] as const) : (['getLinkList'] as const),
  },
  kloud: {
    getKloudList: ['getKloudList'] as const,
    getGroupMenuList: ['getGroupMenuList'] as const,
    getKloudById: (id: number) => ['getKloudById', id] as const,
  },
};

export default queryKeys;
