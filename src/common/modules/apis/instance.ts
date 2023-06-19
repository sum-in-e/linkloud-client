import { NEED_LOGIN } from '@/common/modules/constants/auth';
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
        error: NEED_LOGIN,
        return_to: window.location.pathname,
      });

      window.location.href = `/login?${queryString}`;
    }

    // 다른 에러들은 그대로 reject하기
    return Promise.reject(error);
  }
);

/**
 * 서버 컴포넌트에서 비동기 요청 시 사용하는 인스턴스
 * 서버 컴포넌트에서는 401 발생 시 인터셉터를 활용한 페이지 이동 처리가 불가하여 각 요청에 대해 page 레이어에서 개별로 페이지 이동 처리를 하도록 합니다.
 */
export const instanceForServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
