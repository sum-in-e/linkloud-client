import { instance } from '@/common/modules/apis/instance';
import { SuccessResponseType } from '@/common/modules/types/responseType';
import { KloudEntity } from '@/features/kloud/modules/types/kloudType';

export type createKloudBody = Pick<KloudEntity, 'name'>;

export type CreateKloudResponse = SuccessResponseType<
  Pick<KloudEntity, 'id' | 'name'>
>;

/**
 * @description 클라우드 생성 API
 */
export const createKloud = async (
  body: createKloudBody
): Promise<CreateKloudResponse> => {
  const { data } = await instance.post(`/kloud`, body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type KloudListKloudType = Pick<
  KloudEntity,
  'id' | 'name' | 'position'
> & {
  linkCount: number;
};

export type GetKloudListData = {
  count: number;
  klouds: KloudListKloudType[] | [];
};

export type GetKloudListResponse = SuccessResponseType<GetKloudListData>;

/**
 * @description 클라우드 리스트 조회 API
 */
export const getKloudList = async (): Promise<GetKloudListResponse> => {
  const { data } = await instance.get(`/kloud/list`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type GetKloudByIdData = Pick<KloudEntity, 'id' | 'name'> & {
  linkCount: number;
};

export type GetKloudByIdResponse = SuccessResponseType<GetKloudByIdData>;

export type GetKloudByIdParam = { id: number };

/**
 * @description id에 해당하는 클라우드 조회 API -> useQuery 안 만들었으니까 쓸 때 만들어 😊
 */
export const getKloudById = async ({
  id,
}: GetKloudByIdParam): Promise<GetKloudByIdResponse> => {
  const { data } = await instance.get(`/kloud/${id}`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type PatchKloudByIdData = Pick<KloudEntity, 'id' | 'name'>;

export type PatchKloudByIdResponse = SuccessResponseType<PatchKloudByIdData>;

export type PatchKloudByIdParam = { id: number; body: { name: string } };

/**
 * @description id에 해당하는 클라우드 수정 API
 */
export const patchKloudById = async ({
  id,
  body,
}: PatchKloudByIdParam): Promise<PatchKloudByIdResponse> => {
  const { data } = await instance.patch(`/kloud/${id}`, body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type PatchKloudPositionByIdResponse = SuccessResponseType<{}>;

export type PatchKloudPositionByIdParam = {
  id: number;
  body: { newPosition: number };
};

/**
 * @description id에 해당하는 클라우드 순서 변경 API
 */
export const patchKloudPositionById = async ({
  id,
  body,
}: PatchKloudPositionByIdParam): Promise<PatchKloudPositionByIdResponse> => {
  const { data } = await instance.patch(`/kloud/position/${id}`, body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type DeleteKloudByIdResponse = SuccessResponseType<{}>;

export type DeleteKloudByIdParam = { id: number };

/**
 * @description id에 해당하는 클라우드 제거 API
 */
export const deleteKloudById = async ({
  id,
}: DeleteKloudByIdParam): Promise<DeleteKloudByIdResponse> => {
  const { data } = await instance.delete(`/kloud/${id}`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type GetGroupMenuListData = {
  all: number;
  myCollection: number;
  unread: number;
  uncategorized: number;
  klouds: KloudListKloudType[] | [];
};

export type GetGroupMenuListResponse =
  SuccessResponseType<GetGroupMenuListData>;

/**
 * @description 그룹별 링크 개수를 조회하는 API
 */
export const getGroupMenuList = async (): Promise<GetGroupMenuListResponse> => {
  const { data } = await instance.get(`/groups/count`);
  return data;
};
