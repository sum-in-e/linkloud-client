'use client';

import Image from 'next/image';
import preview_pc from '/public/images/preview.png';
import preview_mobile from '/public/images/preview_mobile.png';
import Link from 'next/link';

const TopSection = () => {
  return (
    <section className="flex w-full flex-col gap-10 px-4 pb-10 pt-32 md:flex-row md:gap-0 md:px-0 md:py-7">
      <div className="flex w-full flex-col justify-center gap-4 md:w-[40%] md:px-4">
        <h2 className="text-3xl font-bold md:text-4xl">Cloud for Link</h2>
        <p className="whitespace-pre-wrap break-keep text-lg font-semibold text-zinc-600 md:whitespace-normal md:text-xl">
          {`언제, 어디서든 필요한 링크들을 저장하고 확인하세요.`}
        </p>
        <Link
          href="/login"
          className="reset-button text-md w-fit rounded-xl bg-black px-10 py-2 font-bold  text-white md:w-fit md:text-lg md:hover:bg-zinc-700"
        >
          시작하기
        </Link>
      </div>
      <div className="relative w-full md:w-[60%] md:px-4 md:py-36">
        <div className="overflow-hidden rounded-lg border border-zinc-200 shadow-sm md:-translate-y-20">
          <Image
            src={preview_pc}
            alt="linkloud preview"
            className="h-auto w-full"
            loading="eager"
          />
        </div>
        <div className="absolute bottom-6 right-6 hidden w-[30%] overflow-hidden rounded-lg border border-zinc-200 shadow-sm md:block">
          <Image
            src={preview_mobile}
            alt="linkloud mobile preview"
            className="h-auto w-full"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default TopSection;
