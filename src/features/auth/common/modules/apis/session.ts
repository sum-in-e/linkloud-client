import { instance, instanceForServer } from '@/common/modules/apis/instance';
import { SignUpMethodType } from '@/features/auth/signup/modules/types/signupType';
import { cookies } from 'next/headers';

export type GetMeResponse = SuccessResponseType<{
  id: number;
  email: string;
  method: SignUpMethodType;
  name: string;
}>;

export const getSession = async (): Promise<GetMeResponse> => {
  const { data } = await instance.get(`/user/me`);
  return data;
};

/**
 * 서버 컴포넌트에서 세션 확인 API 요청할 경우 사용 - 쿠키가 자동으로 요청 헤더에 실리지 않기 때문에 직접 넣어줍니다.
 */
export const getSessionInSever = async (): Promise<GetMeResponse> => {
  const cookieStore = cookies();
  const sq = cookieStore.get('sq')?.value;
  const bp = cookieStore.get('bp')?.value;

  const { data } = await instanceForServer.get(`/user/me`, {
    headers: {
      Cookie: `sq=${sq}; bp=${bp}`,
    },
  });
  return data;
};
