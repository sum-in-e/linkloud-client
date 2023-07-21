'use client';

import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';

const sections = [
  {
    title: '간편하게 저장하기',
    text: `링크만 넣어도 정보가 채워져요.\n간편하게 저장하고 한눈에 알아보세요!`,
    image: 'GIF1',
  },
  {
    title: '다양한 카테고리로 분류하기',
    text: `클라우드를 만들어 링크를 분류하고\n필요할 때 쉽게 찾아보세요.\n원하는 클라우드를 만들어서 관리할 수 있어요!`,
    image: 'GIF2',
  },
  {
    title: '필요한 정보 놓치지 않기',
    text: (
      <>
        <span>
          {`저장해놓고 잊어버린 링크들,\n쉽게 체크할 수 있게 도와드릴게요.\n`}
        </span>
        <span className="md:whitespace-normal">{`읽지 않은 링크를 한 곳에서 확인하고\n알림도 받아보세요!`}</span>
      </>
    ),
    image: 'GIF3',
  },
  {
    title: '어디서든 사용하기',
    text: (
      <>
        <span>{`PC에서는 웹으로, 모바일에서는 웹 App으로\n어디서든 사용하세요.\n모바일에서 링클라우드를 홈 화면에 바로가기로 추가하면 웹 App으로 사용할 수 있어요!\n`}</span>
        <span className="text-xs text-gray-500">
          {`추가하는 방법은 `}
          <button
            type="button"
            className="w-fit text-xs text-gray-500 underline"
            onClick={() => window.open('https://www.craft.me/s/AGjkOZUm2mFTDE')}
          >
            {`사용 가이드`}
          </button>
          {` 문서를 확인해 주세요.`}
        </span>
      </>
    ),
    image: 'GIF4',
  },
];

const FeatureSection = () => {
  return (
    <section className="flex w-full flex-col gap-6 rounded-2xl bg-slate-100 py-8 md:px-48 md:py-10">
      {sections.map((section) => (
        <Article
          key={section.title}
          title={section.title}
          text={section.text}
          image={section.image}
        />
      ))}
    </section>
  );
};

export default FeatureSection;

const GIF = ({ image }: { image: string }) => {
  // Intersection Observer를 사용하여 이미지가 화면에 보이는지 확인합니다.
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  // React Spring을 사용하여 이미지가 화면에 보일 때 애니메이션 효과를 줍니다.
  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'scale(1)' : 'scale(0.8)',
  });

  return (
    <animated.div ref={ref} style={spring}>
      {/* TODO: GIF 넣으면서 고정값 쓰고 있는거 상대적 단위로 되도록 바꾸기 */}
      <div className="flex h-[150px] w-[300px] items-center justify-center rounded-2xl bg-gray-300 md:h-[200px] md:w-[400px]">
        {image}
      </div>
    </animated.div>
  );
};

const Article = ({
  title,
  text,
  image,
}: {
  title: string;
  text: React.ReactNode;
  image: string;
}) => {
  return (
    <article className="flex w-full flex-col items-center gap-10 py-10 md:grid md:grid-cols-2 md:py-10">
      <div className="flex w-full flex-col items-center gap-2 text-center md:items-start md:text-start">
        <h3 className="text-2xl font-bold md:text-3xl">{title}</h3>
        <p className="whitespace-pre-line break-keep text-gray-700">{text}</p>
      </div>
      <GIF image={image} />
    </article>
  );
};
