import { instance } from '@/common/modules/apis/instance';
import { SuccessResponseType } from '@/common/modules/types/responseType';
import { LinkInfoType } from '@/features/link/modules/apis/link';
import { LinkManagerListType } from '@/features/linkManager/modules/types/linkManager';

export type GetLinkListForLinkManagerData = {
  [Key in LinkManagerListType]: LinkInfoType[];
};

export type GetLinkListForLinkManagerResponse =
  SuccessResponseType<GetLinkListForLinkManagerData>;

/**
 * @description 링크 관리 매니저를 위한 링크 리스트 조회 API
 */
export const getLinkListForLinkManager =
  async (): Promise<GetLinkListForLinkManagerResponse> => {
    const { data } = await instance.get(`/link/list/link-manager`);
    return data;
  };

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️
