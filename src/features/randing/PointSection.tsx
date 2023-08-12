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
        <p className="text-xs underline">크롬 익스텐션 설치하기</p>
        {/* //TODO: 크롬 익스텐션 배포 후 Link 태그로 바꿔서 익스텐션 설치 주소 넣기 */}
      </>
    ),
    icon: <BsLink45Deg size={20} />,
  },
  {
    title: '다양한 카테고리로 분류하기',
    description: `클라우드를 만들어 링크를 분류하고 필요할 때 쉽게 찾아보세요.`,
    icon: <BsCloud size={20} />,
  },
  {
    title: '나중에 볼 링크 놓치지 않기',
    description: `확인하지 않은 링크들을 모아보거나,\n클라우드별로 확인하지 않은 링크가 있는지 알 수 있어요.\n확인한 링크는 표시가 되어 어떤 링크를 확인하지 않았는지 쉽게 파악할 수 있습니다.`,
    icon: <BsEyeglasses size={20} />,
  },
  {
    title: '어디서든 저장하고 확인하기',
    description: (
      <>
        <p>{`웹을 통해 PC, 모바일 상관 없이 어디서든 확인하세요.\n모바일은 PWA 앱 설치를 통해 더욱 빠르게 링클라우드에 접속할 수 있어요!`}</p>
        <Link
          href="https://www.craft.me/s/tmcH2IrLqT3haN"
          target="_blank"
          className="text-xs underline"
        >
          PWA 앱 설치 방법 확인하기
        </Link>
      </>
    ),
    icon: (
      <div className="flex gap-1">
        <BsDisplay size={20} />
        <BsPhone size={20} />
      </div>
    ),
  },
];

const PointSection = () => {
  return (
    <section className="grid w-full grid-cols-1 gap-6 px-4 py-16 md:grid-cols-2 md:gap-10 md:px-0 md:py-32">
      {points.map((point, index) => (
        <div
          key={index}
          className="mx-auto flex w-full flex-col gap-2 rounded-xl border-2 border-zinc-700 p-4"
        >
          {point.icon}
          <h4 className="text-lg font-bold text-primary-alt">{point.title}</h4>
          <div className="whitespace-pre-wrap break-keep">
            {point.description}
          </div>
        </div>
      ))}
    </section>
  );
};

export default PointSection;
