import { instance } from '@/common/modules/apis/instance';
import { SuccessResponseType } from '@/common/modules/types/responseType';
import { KloudEntity } from '@/features/kloud/modules/types/kloudType';
import { LinkEntity } from '@/features/link/modules/types/linkType';
import queryString from 'querystring';

export type linkAnalyzeParams = {
  url: string;
};

export type LinkAnalyzeData = {
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
};

export type LinkAnalyzeResponse = SuccessResponseType<LinkAnalyzeData>;

/**
 * @description 메타태그 기반 링크 정보 가져오는 API
 */
export const linkAnalyze = async ({
  url,
}: linkAnalyzeParams): Promise<LinkAnalyzeResponse> => {
  const { data } = await instance.post(`/link/analyze?url=${url}`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export interface createLinkBody extends LinkAnalyzeData {
  kloudId: number | null;
}

export type CreateLinkResponse = SuccessResponseType<{
  kloudId: number | null;
}>;

/**
 * @description 링크 생성 API
 */
export const createLink = async (
  body: createLinkBody
): Promise<CreateLinkResponse> => {
  const { data } = await instance.post(`/link`, body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type LinkInfoKloudType = Pick<KloudEntity, 'id' | 'name'> | null;

export type LinkInfoType = Pick<
  LinkEntity,
  | 'id'
  | 'url'
  | 'thumbnailUrl'
  | 'title'
  | 'description'
  | 'memo'
  | 'isInMyCollection'
  | 'isChecked'
  | 'createdAt'
> & {
  kloud: LinkInfoKloudType;
};

export type GetLinkListData = {
  count: number;
  links: LinkInfoType[];
};

export type GetLinkListResponse = SuccessResponseType<GetLinkListData>;

export type GetLinkListParams = {
  offset: number; // (requiered)
  limit: number; // (requiered)
  sort?: 'ASC' | 'DESC';
  keyword?: string;
  isChecked?: boolean;
  myCollection?: boolean;
  kloudId?: number; // 클라우드 미지정의 경우 0 | 찾고싶은 클라우드 id
};

/**
 * @description 링크 리스트(+검색) API
 */
export const getLinkList = async (
  params: GetLinkListParams
): Promise<GetLinkListResponse> => {
  const query = queryString.stringify({ ...params });

  const { data } = await instance.get(`/link/list?${query}`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️
export type PatchSelectedLinksKloudParams = {
  linkIds: number[];
  kloudId: number | null;
};

export type PatchSelectedLinksKloudResponse = SuccessResponseType<{}>;

/**
 * @description 선택한 링크 일괄 클라우드 변경 API
 */
export const patchSelectedLinksKloud = async (
  body: PatchSelectedLinksKloudParams
): Promise<PatchSelectedLinksKloudResponse> => {
  const { data } = await instance.patch('/link/ids/kloud', body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type DeleteSelectedLinksParam = {
  linkIds: number[];
};

export type DeleteSelectedLinksResponse = SuccessResponseType<{}>;

/**
 * @description 선택한 링크 일괄 제거 API
 */
export const deleteSelectedLinks = async (
  body: DeleteSelectedLinksParam
): Promise<DeleteSelectedLinksResponse> => {
  const { data } = await instance.post('/link/ids/delete', body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type PatchLinkCountResponse = SuccessResponseType<{}>;

export type PatchLinkCountParam = { id: number };

/**
 * @description 링크 클릭 횟수 카운팅 API
 */
export const patchLinkCount = async ({
  id,
}: PatchLinkCountParam): Promise<PatchLinkCountResponse> => {
  const { data } = await instance.patch(`/link/${id}/click-count`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type PatchLinkByIdResponse = SuccessResponseType<LinkInfoType>;

export type PatchLinkByIdParam = {
  id: number;
  body: {
    title?: string;
    description?: string;
    memo?: string;
    isInMyCollection?: boolean;
    kloudId?: number | null;
  };
};

/**
 * @description 링크 수정 API
 */
export const patchLinkById = async ({
  id,
  body,
}: PatchLinkByIdParam): Promise<PatchLinkByIdResponse> => {
  const { data } = await instance.patch(`/link/${id}`, body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type DeleteLinkByIdResponse = SuccessResponseType<{}>;

export type DeleteLinkByIdParam = {
  id: number;
};

/**
 * @description 링크 수정 API
 */
export const deleteLinkById = async ({
  id,
}: DeleteLinkByIdParam): Promise<DeleteLinkByIdResponse> => {
  const { data } = await instance.delete(`/link/${id}`);
  return data;
};
