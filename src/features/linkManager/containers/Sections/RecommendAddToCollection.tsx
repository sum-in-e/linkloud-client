import LinkManagerLinkList from '@/features/linkManager/containers/LinkManagerLinkList';

const RecommendAddToCollectionSection = () => {
  return (
    <section className="pb-6 pt-4">
      <h2 className="mb-1 text-xl font-bold">소장할 링크를 추천해 드려요!</h2>
      <div className="whitespace-pre-wrap rounded-lg bg-gray-200 px-2 py-2 text-xs">
        {`❓확인했지만 내 컬렉션에 등록하지 않은 링크들 중 가장 많이 클릭한 것부터 보여드려요. 내 컬렉션 등록을 통해 소장하겠다는 표식을 남겨보세요!\n🪄Tip - 내 컬렉션에 등록된 링크는 소장하는 것으로 간주됩니다. 임시 저장한 링크와 구분 지을 수 있는 좋은 방법이에요!`}
      </div>
      <LinkManagerLinkList listType="recommendAddToCollection" />
    </section>
  );
};

export default RecommendAddToCollectionSection;
