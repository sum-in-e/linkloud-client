import { instance } from '@/common/modules/apis/instance';

export type LogOutResponse = SuccessResponseType<{}>;

export const logOut = async (): Promise<LogOutResponse> => {
  return await instance.post('/user/logout');
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type SignOutParams = {
  reason: string;
};

export type SignOutResponse = SuccessResponseType<{}>;

export const signOut = async (
  params: SignOutParams
): Promise<SignOutResponse> => {
  return await instance.delete(`/user?reason=${params.reason}`);
};
