import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section className="flex h-full min-h-[75vh] flex-col items-center justify-center gap-5">
      <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다 😅</h2>
      <Link
        href="/"
        className=" w-[300px] select-none rounded-md bg-primary px-4 py-3 text-center font-bold text-white hover:bg-primary-darker focus:outline-none md:w-fit"
      >
        홈으로 돌아가기
      </Link>
    </section>
  );
};

export default NotFoundPage;
