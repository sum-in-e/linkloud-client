'use client';

import { useRouter } from 'next/navigation';

const MenuItem = ({
  title,
  count,
  href,
}: {
  href: string;
  title: string;
  count: number;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button
      className="flex w-full items-center justify-between rounded-2xl bg-slate-200 px-4 py-3 text-sm font-bold"
      onClick={handleClick}
      type="button"
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</p>
      <p>{count}</p>
    </button>
  );
};

export default MenuItem;
