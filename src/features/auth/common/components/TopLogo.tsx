import Image from 'next/image';

const TopLogo = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <Image
        width={120}
        height={40}
        alt="Linkloud Logo"
        src="https://res.cloudinary.com/dqcgvbbv7/image/upload/v1686554950/linkloud/logo_v_avimgi.png"
        className="w-[120px]"
      />
      <p className="text-sm text-slate-500">
        링크를 관리하고 생산적인 일상을 함께해 보세요!
      </p>
    </section>
  );
};

export default TopLogo;
