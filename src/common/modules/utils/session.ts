import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

/**
 * httponly 쿠키로 저장된 액세스토큰과 리프레시토큰을 검증하여 로그인 여부를 확인하는 함수입니다.
 * 서버 컴포넌트에서 httponly 쿠키에 접근 가능하기 때문에 서버 컴포넌트에서만 사용 가능하며, API를 호출하지 않고 프론트에서 유저 로그인 여부를 판별하기 위해 사용합니다.
 * (보안과 크게 관련 없는 부분에서만 유저 로그인 여부를 확인하는데에 사용해 주세요.)
 */
export const getSessionWithJwtInServer = async () => {
  const cookieStore = cookies();
  const acc = cookieStore.get('sq')?.value;
  const rft = cookieStore.get('bp')?.value;
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || 'linkloud_230218';

  if (acc) {
    const verifiedAcc = jwt.verify(acc, secret);
    if (verifiedAcc) {
      // * 액세스 토큰 있으면 로그인 상태
      return true;
    }
  } else {
    if (rft) {
      // * 액세스 토큰 없지만 리프레시 토큰은 있다면 인증이 필요한 페이지 진입 후 권한 필요한 API 요청하면서 갱신될테니 로그인 상태로 인정(만일 문제 있으면 권한 필요한 작업 시 401 떨어져서 요청 실패할 것이므로 걱정X)
      const verifiedRft = jwt.verify(rft, secret);
      if (verifiedRft) {
        return true;
      }
    }
  }

  return false;
};
