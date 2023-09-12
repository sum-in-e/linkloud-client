import LinkManagerLinkList from '@/features/linkManager/containers/LinkManagerLinkList';

const UncheckedOverTwoWeeksSection = () => {
  return (
    <section className="pb-6 pt-4">
      <h2 className="mb-1 text-xl font-bold">
        오랫동안 확인하지 않은 링크가 있어요!
      </h2>
      <div className="whitespace-pre-wrap rounded-lg bg-gray-200 px-2 py-2 text-xs">
        {`❓14일 이상 확인하지 않은 링크들을 오래된 링크부터 최대 10개까지 알려드려요.\n🪄Tip - 내 컬렉션에 등록된 링크는 소장하는 것으로 간주하여 리스트에서 제외됩니다.`}
      </div>
      <LinkManagerLinkList listType="uncheckedOverTwoWeeks" />
    </section>
  );
};

export default UncheckedOverTwoWeeksSection;
