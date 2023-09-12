'use client';

import RecommendedReadsLinkList from '@/features/home/RecommendedReadsSection/RecommendedReadsLinkList';

const RecommendedReadsSection = () => {
  return (
    <section className="w-full">
      <h2 className="mb-1 pt-4 text-xl font-bold">지금 읽을 만한 것</h2>
      <div className="rounded-lg bg-gray-200 px-2 py-2 text-xs">
        ✨미확인 링크 중 랜덤으로 최대 10개의 링크를 추천합니다.
      </div>
      <RecommendedReadsLinkList />
    </section>
  );
};

export default RecommendedReadsSection;
