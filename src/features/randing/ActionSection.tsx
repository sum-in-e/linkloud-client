import Link from 'next/link';

const ActionSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-6">
      <p className="whitespace-pre-line text-center text-lg md:whitespace-normal">
        {`링클라우드로 손쉽게 링크를 관리하고,\n생산적인 일상을 함께하러 가볼까요?`}
      </p>
      <Link
        href="/login"
        className="common-button rounded-2xl bg-primary px-9 py-3 font-bold text-white hover:bg-primary-lighter md:w-fit"
      >
        지금 시작하기
      </Link>
    </section>
  );
};

export default ActionSection;
