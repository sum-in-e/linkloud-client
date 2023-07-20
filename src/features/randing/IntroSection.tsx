const IntroSection = () => {
  return (
    <section className="flex flex-col items-center gap-16">
      <h2 className="text-6xl font-bold md:text-7xl">Linkloud</h2>

      <div className="text-center text-xl">
        <p className="whitespace-pre-line text-gray-700 md:whitespace-normal">
          {`링크를 저장하고\n필요할 때 다시 찾아볼 수 있는`}
        </p>
        <p className="font-bold text-primary">{`링크를 위한 클라우드`}</p>
      </div>

      <div className="flex flex-col gap-8 rounded-2xl border-[1px] border-gray-200 px-2 py-5 text-center font-semibold md:p-5">
        <div className="whitespace-pre-line text-gray-500 md:whitespace-normal">
          <p>{`메신저의 "나에게 보내기", SNS의 북마크 등`}</p>
          <p>
            {`여러 플랫폼에 링크를 저장해두고\n`}
            <Underline>{`잊어버린 경험`}</Underline>
            {`이 있지 않으신가요?`}
          </p>
        </div>

        <p>{`☁이제는 링클라우드에서 관리하세요☁`}</p>

        <div className="text-gray-600">
          <p>{`다시 보고 싶은 글, 영상 혹은 나중에 볼 링크를`}</p>
          <p className="whitespace-pre-line md:whitespace-normal">
            <Underline>간편하게 저장</Underline>
            {`하고\n언제 어디서든 `}
            <Underline>손쉽게 찾아보세요.</Underline>
          </p>
        </div>
      </div>
    </section>
  );
};

const Underline = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-gray-800 underline">{children}</span>;
};

export default IntroSection;
