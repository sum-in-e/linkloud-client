'use client';

import RecommendedReadsLinkList from '@/features/home/RecommendedReadsSection/RecommendedReadsLinkList';

const RecommendedReadsSection = () => {
  return (
    <section className="w-full">
      <h2 className="mb-1 pt-4 text-xl font-bold">지금 읽을 만한 것</h2>
      <RecommendedReadsLinkList />
    </section>
  );
};

export default RecommendedReadsSection;
