'use client';

const IntroSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-8 px-4 py-24 md:px-0 md:py-28">
      <h4 className="whitespace-pre-wrap break-keep text-center text-xl font-bold">
        {`메신저의 "나에게 보내기", SNS 북마크 등\n여러 플랫폼에 나중에 볼 링크를 저장해두고 잊어버린 경험이 있지 않으신가요?`}
      </h4>
      <div>
        <p className="whitespace-pre-wrap break-keep text-center">
          관심있는 정보들을 Linkloud에 담아두고 확인하세요.
        </p>
        <p className="whitespace-pre-wrap break-keep text-center">
          여러분이 얻고자 했던 정보를 놓치지 않을 수 있도록 도와드립니다.
        </p>
      </div>
    </section>
  );
};
export default IntroSection;
