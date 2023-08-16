'use client';

import Link from 'next/link';
import {
  BsDisplay,
  BsPhone,
  BsCloud,
  BsLink45Deg,
  BsEyeglasses,
} from 'react-icons/bs';

const points = [
  {
    title: '간편하게 저장하기',
    description: (
      <>
        <p>
          {`링크만 넣어도 정보가 채워져요.\nPC에서는 크롬 익스텐션을 활용하면 더욱 쉽고 빠르게 링크를 저장할 수 있어요!`}
        </p>
        <Link
          href="https://chrome.google.com/webstore/detail/linkloud/ccmcdofnhlnnhjihdlhnclbnpmimilkc"
          target="_blank"
          className="text-xs text-zinc-300 underline"
        >
          크롬 익스텐션 설치하기
        </Link>
      </>
    ),
    icon: <BsLink45Deg size={20} className="fill-secondary" />,
  },
  {
    title: '다양한 카테고리로 분류하기',
    description: `클라우드를 만들어 링크를 분류하고 필요할 때 쉽게 찾아보세요.`,
    icon: <BsCloud size={20} className="fill-secondary" />,
  },
  {
    title: '나중에 볼 링크 놓치지 않기',
    description: `확인하지 않은 링크들을 모아보거나,\n클라우드별로 확인하지 않은 링크가 있는지 알 수 있어요.\n확인한 링크는 표시가 되어 어떤 링크를 확인하지 않았는지 쉽게 파악할 수 있습니다.`,
    icon: <BsEyeglasses size={20} className="fill-secondary" />,
  },
  {
    title: '어디서든 저장하고 확인하기',
    description: (
      <>
        <p>{`웹을 통해 PC, 모바일 상관없이 어디서든 확인하세요.\n모바일은 PWA 앱 설치를 통해 더욱 빠르게 링클라우드에 접속할 수 있어요!`}</p>
        <Link
          href="https://www.craft.me/s/tmcH2IrLqT3haN"
          target="_blank"
          className="text-xs text-zinc-300 underline"
        >
          PWA 앱 설치 방법 확인하기
        </Link>
      </>
    ),
    icon: (
      <div className="flex gap-1">
        <BsDisplay size={20} className="fill-secondary" />
        <BsPhone size={20} className="fill-secondary" />
      </div>
    ),
  },
];

const PointSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-7 px-4 py-16 md:gap-10 md:px-0 md:py-24">
      <h4 className="text-2xl font-bold">링클라우드에서 제공하는 기능들</h4>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 ">
        {points.map((point, index) => (
          <div
            key={index}
            className="mx-auto flex w-full flex-col gap-2 rounded-xl bg-primary-alt  p-4"
          >
            {point.icon}
            <h4 className="text-lg font-bold text-white">{point.title}</h4>
            <div className="whitespace-pre-wrap break-keep text-zinc-200">
              {point.description}
            </div>
          </div>
        ))}
      </div>
      <h4 className="w-full whitespace-pre-wrap break-keep text-center text-lg font-semibold text-zinc-500 md:whitespace-normal">
        {`링클라우드를 더 자세히 알고 싶다면\n`}
        <Link
          href="https://www.craft.me/s/AGjkOZUm2mFTDE"
          target="_blank"
          className="text-primary-alt underline"
        >
          {`사용 가이드`}
        </Link>
        {`를 확인해 주세요!`}
      </h4>
    </section>
  );
};

export default PointSection;
