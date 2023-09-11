import { NEED_LOGIN } from '@/common/modules/constants/auth';
import { sentryLogger } from '@/common/modules/utils/sentry';
import axios from 'axios';
import * as querystring from 'querystring';

/**
 * 클라이언트 컴포넌트에서 비동기 요청 시 사용하는 인스턴스
 */
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// 응답 인터셉터
instance.interceptors.response.use(
  // 응답을 성공적으로 받았을 때
  (response) => {
    return response;
  },
  // 에러가 발생했을 때
  (error) => {
    // 에러 상태 코드가 401이면
    if (error.response.status === 401) {
      // 모달로 세션만료 알림 띄우기
      const queryString = querystring.stringify({
        error: encodeURIComponent(NEED_LOGIN),
        return_to: window.location.pathname,
      });

      window.location.replace(`/login?${queryString}`);
    }

    if (error.response.status === 500) {
      alert(
        `서버 오류로 인해 요청에 실패하였습니다. 잠시후 다시 시도해 주세요.\n문제가 지속적으로 발생할 경우 'Help & Info' 메뉴의 버그 제보를 통해 문제가 발생한 상황을 제보해 주시면 빠르게 개선할 수 있도록 하겠습니다😃`
      );
    }

    sentryLogger(error);

    // 다른 에러들은 그대로 reject하기
    return Promise.reject(error);
  }
);
