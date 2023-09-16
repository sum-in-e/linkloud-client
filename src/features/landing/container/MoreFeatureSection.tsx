import Image from 'next/image';
import chrome_extension_logo from '/public/images/landing/chrome-extension-logo.webp';
import linkloud_logo from '/public/images/logo.png';
import Link from 'next/link';
import { BsArrowRightCircleFill } from 'react-icons/bs';

const MoreFeatureSection = () => {
  return (
    <section className="flex w-full justify-center">
      <div className="w-full max-w-screen-xl justify-center px-4 py-14 md:px-10 md:py-20">
        <h2 className="md:reading-8 mb-10 mt-3 whitespace-normal text-center text-xl font-semibold leading-9 text-zinc-800 md:whitespace-pre-wrap md:text-3xl">
          {`링클라우드를 쉽고 빠르게 이용하세요`}
        </h2>
        <ul className="flex flex-col gap-14 md:flex-row md:justify-center">
          {items.map((item, index) => (
            <li key={index} className="flex flex-col">
              <div className="h-14 w-14 flex-shrink-0 rounded-lg border border-zinc-300 p-2">
                <Image
                  alt={item.alt}
                  src={item.src}
                  className="h-full w-full"
                />
              </div>
              <h5 className="mb-3 mt-2 text-lg font-semibold text-zinc-800">
                {item.title}
              </h5>
              <p className="whitespace-pre-wrap text-zinc-500">
                {item.description}
              </p>
              <div className="pt-3">{item.buttonComponent}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MoreFeatureSection;

const items = [
  {
    title: '링클라우드 크롬 익스텐션',
    description: `크롬 브라우저의 현재 탭을 링클라우드에 간편하게 저장할 수 있습니다.\n설치 후 클릭 한 번으로 손쉽게 현재 탭의 정보를 가져오고 저장하세요.`,
    src: chrome_extension_logo,
    alt: 'Chrome Extention Logo',
    buttonComponent: (
      <Link
        href="https://chrome.google.com/webstore/detail/linkloud/ccmcdofnhlnnhjihdlhnclbnpmimilkc"
        target="_blank"
        className="group-first flex w-fit items-center gap-1 text-sm font-semibold text-zinc-600 md:hover:text-primary-alt"
      >
        설치하러 가기
        <BsArrowRightCircleFill
          size={13}
          className=" md:group-hover/second:fill-primary-alt"
        />
      </Link>
    ),
  },
  {
    title: 'PWA 앱 설치하기',
    description: `모바일에서 링클라우드를 바탕 화면에 추가하면 앱으로 이용할 수 있습니다.\n매번 웹 브라우저를 통해 접속하는 번거로움을 덜어드려요.`,
    src: linkloud_logo,
    alt: 'Linkloud Logo',
    buttonComponent: (
      <Link
        href="https://www.craft.me/s/tmcH2IrLqT3haN"
        target="_blank"
        className="group-second flex w-fit items-center gap-1 text-sm font-semibold text-zinc-600 md:hover:text-primary-alt"
      >
        설치 방법 확인하기
        <BsArrowRightCircleFill
          size={13}
          className=" md:group-hover/first:fill-primary-alt"
        />
      </Link>
    ),
  },
];
