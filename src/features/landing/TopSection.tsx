'use client';

import Image from 'next/image';
import preview_pc from '/public/images/preview.png';
import preview_mobile from '/public/images/preview_mobile.png';
import Link from 'next/link';

const TopSection = () => {
  return (
    <section className="flex w-full flex-col gap-10 px-4 pb-10 pt-32 md:flex-row md:gap-0 md:px-0 md:py-7">
      <div className="flex w-full flex-col justify-center gap-4 md:w-[40%] md:px-4">
        <h2 className="text-3xl font-bold md:text-4xl">
          나중에 볼 링크를 한곳에
        </h2>
        <p className="whitespace-pre-wrap break-keep text-lg font-semibold text-zinc-600 md:whitespace-normal md:text-xl">
          {`Linkloud는 링크를 쉽게 관리하고\n확인할 수 있도록 해주는\n링크를 위한 클라우드입니다.`}
        </p>
        <Link
          href="/login"
          className="reset-button text-md w-fit rounded-xl border-2 border-primary px-10 py-2 font-bold  text-primary hover:bg-zinc-100 md:w-fit md:text-lg"
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
            priority
          />
        </div>
        <div className="absolute bottom-6 right-6 hidden w-[30%] overflow-hidden rounded-lg border border-zinc-200 shadow-sm md:block">
          <Image
            src={preview_mobile}
            alt="linkloud mobile preview"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default TopSection;