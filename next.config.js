/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');
const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public', // 서비스 워커 파일과 관련된 파일들을 public 폴더에 저장
  register: true, // 직접 등록할거면 여기서 false 처리해야 중복으로 등록되지 않는다.
  skipWaiting: true, // 새로운 서비스 워커가 설치되자마자 이전 버전의 서비스 워커를 대체하도록 설정. => 업데이트시 빠르게 적용됨
  customWorkerDir: '/public/worker', // 커스텀 서비스 워커 폴더를 지정 (worker 폴더에 있는 파일들이 next-pwa가 생성한 sw.js 파일에 추가된다.)
  runtimeCaching, //PWA가 오프라인 작동을 지원하기 위해 캐싱해주는 역할
  // disable: process.env.NEXT_PUBLIC_MODE === 'development', // disable is help to disable PWA in deployment mode
});

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/kloud',
        destination: '/kloud/all',
        permanent: true,
      },
    ];
  },
};

const sentryConfig = {
  hideSourceMaps: true,
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,
  silent: true,
  disableLogger: true, // Automatically tree-shake Sentry logger statements to reduce bundle size
  org: 'linkloud',
  project: 'linkloud-client',
};

module.exports = withSentryConfig(withPWA(nextConfig), sentryConfig);
