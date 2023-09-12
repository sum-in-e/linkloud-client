import RecommendAddToCollectionSection from '@/features/linkManager/containers/Sections/RecommendAddToCollection';
import UncheckedOverTwoWeeksSection from '@/features/linkManager/containers/Sections/UncheckedOverTwoWeeks';

const LinkManager = () => {
  return (
    <div className="scrollbar-hidden w-full overflow-y-scroll">
      <UncheckedOverTwoWeeksSection />
      <RecommendAddToCollectionSection />
    </div>
  );
};

export default LinkManager;
