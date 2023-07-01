import { instance } from '@/common/modules/apis/instance';
import { SuccessResponseType } from '@/common/modules/types/responseType';

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
