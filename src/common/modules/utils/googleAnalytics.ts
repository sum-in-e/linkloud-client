// gtag 사용을 위한 window object 확장
declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageView = (path: string) => {
  if (window !== undefined && GA_TRACKING_ID) {
    window.gtag?.('event', 'page_view', {
      page_path: path,
      send_to: GA_TRACKING_ID,
    });
  }
};
