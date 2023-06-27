import Link from 'next/link';

const NeedLogin = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">로그인이 필요한 서비스입니다. 😅</h1>
    </section>
  );
};

export default NeedLogin;
