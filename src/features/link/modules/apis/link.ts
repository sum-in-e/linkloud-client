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

export const createLink = async (
  body: createLinkBody
): Promise<CreateLinkResponse> => {
  const { data } = await instance.post(`/link`, body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type LinkForList = Pick<
  LinkEntity,
  | 'id'
  | 'url'
  | 'thumbnailUrl'
  | 'title'
  | 'description'
  | 'memo'
  | 'isInMyCollection'
  | 'isRead'
> & {
  kloud: Pick<KloudEntity, 'id' | 'name'> | null;
};

export type GetLinkListData = {
  count: number;
  links: LinkForList[];
};

export type GetLinkListResponse = SuccessResponseType<GetLinkListData>;

export type GetLinkListParams = {
  offset: number; // (requiered)
  limit: number; // (requiered)
  sort?: 'ASC' | 'DESC';
  keyword?: string;
  isRead?: boolean;
  myCollection?: boolean;
  kloudId?: number; // 클라우드 미지정의 경우 0 | 찾고싶은 클라우드 id
};

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

export const patchSelectedLinksKloud = async (
  body: PatchSelectedLinksKloudParams
): Promise<PatchSelectedLinksKloudResponse> => {
  const { data } = await instance.patch('/link/ids/kloud', { ...body });
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type DeleteSelectedLinksParam = {
  linkIds: number[];
};

export type DeleteSelectedLinksResponse = SuccessResponseType<{}>;

export const deleteSelectedLinks = async (
  body: DeleteSelectedLinksParam
): Promise<DeleteSelectedLinksResponse> => {
  const { data } = await instance.post('/link/ids/delete', { ...body });
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type PatchLinkReadResponse = SuccessResponseType<{}>;

export type PatchLinkReadParam = { id: number };

/**
 * @description 링크 열람 처리 API
 */
export const patchLinkRead = async ({
  id,
}: PatchLinkReadParam): Promise<PatchLinkReadResponse> => {
  const { data } = await instance.post(`/link/${id}/read`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️
