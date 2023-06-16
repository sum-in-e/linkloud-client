import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다 😅</h1>
      <Link href="/" className="w-full md:w-fit">
        <button className="focus:shadow-outline w-full select-none rounded-md bg-primary px-4 py-3 font-bold text-white hover:bg-primary-darker focus:outline-none">
          홈으로 돌아가기
        </button>
      </Link>
    </section>
  );
};

export default NotFoundPage;
