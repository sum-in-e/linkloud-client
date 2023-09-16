import Image from 'next/image';
import landing_top from '/public/images/landing/landing_top.webp';
import Link from 'next/link';

const TopSection = () => {
  return (
    <section className="flex w-full justify-center">
      <div className="flex max-w-screen-xl flex-col items-center px-4 py-14 md:px-10 md:py-20">
        <h2 className="md:reading-8 whitespace-pre-wrap text-center text-2xl font-semibold leading-9 text-zinc-800 md:whitespace-normal md:text-4xl">
          {`나중에 볼 링크를\n간편하게 저장하고 관리하세요.`}
        </h2>
        <h4 className="my-5 whitespace-pre-wrap text-center text-xl font-semibold text-zinc-500 md:whitespace-normal md:text-xl">
          {`링크가 잊혀지거나\n방치되지 않도록 도와드립니다.`}
        </h4>
        <Link
          href="/login"
          className="reset-button w-fit rounded-full bg-primary-alt px-6 py-3 text-lg font-semibold text-white md:hover:bg-primary-alt-lighter"
        >
          무료로 시작하기
        </Link>
        <div className="mt-16 max-w-[950px] overflow-hidden rounded-lg shadow-xl">
          <Image
            src={landing_top}
            alt="screenshot"
            className="h-auto w-full"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default TopSection;
