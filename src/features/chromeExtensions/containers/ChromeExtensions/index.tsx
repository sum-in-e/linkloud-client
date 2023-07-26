'use client';

import Image from 'next/image';
import logo from '/public/images/logo.png';

const ChromeExtentions = () => {
  return (
    <section className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-5 bg-zinc-50">
      <Image
        src={logo}
        alt="linkloud Logo"
        className="h-auto w-[50px]"
        priority
      />
      <h2 className="mb-5 whitespace-pre text-center text-sm text-gray-500">
        {`🎉 이제 더욱 간편하게 링크를 저장할 수 있습니다! 🎉\n기존 탭으로 돌아가 링클라우드 크롬 익스텐션을 사용해 보세요!`}
      </h2>

      <p className="fixed bottom-20 left-auto text-xs text-zinc-500">
        copyright {new Date().getFullYear()}. Linkloud All rights reservesd.
      </p>
    </section>
  );
};

export default ChromeExtentions;
