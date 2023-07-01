import { instance } from '@/common/modules/apis/instance';
import { SuccessResponseType } from '@/common/modules/types/responseType';
import { KloudEntity } from '@/features/kloud/modules/types/kloudType';

export type createKloudBody = Pick<KloudEntity, 'name'>;

export type CreateKloudResponse = SuccessResponseType<
  Pick<KloudEntity, 'id' | 'name'>
>;

export const createKloud = async (
  body: createKloudBody
): Promise<CreateKloudResponse> => {
  const { data } = await instance.post(`/kloud`, body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

type KloudsType = Pick<KloudEntity, 'id' | 'name' | 'position'> & {
  linkCount: number;
};

export type GetKloudListData = {
  count: number;
  klouds: KloudsType[] | [];
};

export type GetKloudListResponse = SuccessResponseType<GetKloudListData>;

export const getKloudList = async (): Promise<GetKloudListResponse> => {
  const { data } = await instance.get(`/kloud/list`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️
