import Image from 'next/image';
import grid_item_1 from '/public/images/landing/grid-item-1.gif';
import grid_item_2 from '/public/images/landing/grid-item-2.webp';
import grid_item_3 from '/public/images/landing/grid-item-3.webp';
import grid_item_4 from '/public/images/landing/grid-item-4.webp';
import grid_item_5 from '/public/images/landing/grid-item-5.webp';
import gridFollowing from '/public/images/landing/grid-following.webp';

const PointSection = () => {
  return (
    <section className="flex w-full flex-col items-center bg-primary-alt">
      <div className="w-full max-w-screen-xl">
        <div className="flex w-full flex-col items-start gap-5 px-4 py-14 md:px-10 md:py-20 lg:flex-row">
          <div className="w-full lg:w-[30%] ">
            <p className="md:reading-8 mt-3 whitespace-normal text-2xl font-semibold leading-9 text-zinc-100 md:whitespace-pre-wrap md:text-4xl">
              {`나만의 링크 관리 매니저를 고용하세요`}
            </p>
            <p className="my-5 whitespace-pre-wrap text-lg font-semibold text-zinc-300 md:text-xl">
              {`링크를 관리하기 위해 들여야 했던 시간과 노력을 최소화하고 본연의 일에 더 집중할 수 있습니다.`}
            </p>
          </div>
          <div className="w-full lg:w-[60%]">
            <video className="w-full" controls muted loop autoPlay playsInline>
              <source
                src="https://res.cloudinary.com/dqcgvbbv7/video/upload/v1694843866/linkloud/landing_video_fvxgab.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(calc(50%-10px),1fr))] grid-rows-[1fr] gap-10 px-4 pb-14 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] md:px-10 md:pb-20">
          {items.map((item, index) => (
            <li key={index}>
              <div className="flex h-52 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-50 p-2">
                <Image src={item.src} alt="Linkloud feature" loading="eager" />
              </div>
              <h5 className="mb-3 mt-2 text-lg font-semibold text-zinc-100">
                {item.title}
              </h5>
              <p className="text-zinc-300">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const items = [
  {
    title: '링크만 붙여넣고 빠르게 저장하기',
    description:
      '링크를 입력만 하면 어떤 링크인지 제목, 설명을 자동으로 채워드려요. 어떤 링크인지 일일이 입력해야 하는 번거로움을 덜어드립니다.',
    src: grid_item_1,
  },
  {
    title: '원하는 카테고리로 분류하기',
    description:
      '클라우드(카테고리)를 생성하여 링크를 정리해 보세요. 필요한 링크를 찾기 쉬워집니다. 클라우드로 분류하지 않은 링크가 있다면 그것도 체크해 드려요.',
    src: grid_item_2,
  },
  {
    title: '특별한 링크는 메모 남기기',
    description:
      '링크에 대한 특별한 기록을 남기고 싶다면 메모 기능을 이용해 보세요. 메모가 작성된 링크는 리스트에서 한눈에 알아볼 수 있습니다.',
    src: grid_item_3,
  },
  {
    title: '나중에 볼 링크는 별도로 표시하기',
    description:
      '[나중에 볼 것] 메뉴에서 링크를 모아보고 관리할 수 있어요. 링크의 우측 하단에 있는 북마크 아이콘을 클릭해 등록/해제할 수 있습니다.',
    src: gridFollowing,
  },
  {
    title: '나중에 볼 링크를 한눈에 알아보기',
    description:
      '[나중에 볼 것] 리스트에 추가한 링크는 리스트에서 노란 점으로 표시됩니다. 놓치지 말고 확인하세요!',
    src: grid_item_5,
  },
  {
    title: '필요했던 링크 잊지 않기',
    description:
      '나중에 볼 링크로 구성된 ‘지금 읽을만한 것’ 피드를 제공합니다. 일일이 들여다보는 수고를 들이지 않아도 필요한 링크를 놓치지 않을 수 있어요.',
    src: grid_item_4,
  },
];

export default PointSection;
