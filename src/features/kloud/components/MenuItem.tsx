'use client';

import Link from 'next/link';

const MenuItem = ({
  title,
  count,
  href,
}: {
  href: string;
  title: string;
  count: number;
}) => {
  return (
    <Link
      href={href}
      className="flex w-full items-center justify-between rounded-2xl bg-slate-200 px-4 py-3 text-sm font-bold"
    >
      <p className="">{title}</p>
      <p className="">{count}</p>
    </Link>
  );
};

export default MenuItem;
