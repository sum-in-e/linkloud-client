import Link from 'next/link';

interface Props {
  leftIcon: JSX.Element;
  title: string;
  onClick?: () => void;
  isActivating: boolean;
  href: string;
}

export const MenuButton = ({
  leftIcon,
  title,
  onClick,
  isActivating,
  href,
}: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`color-duration mb-1 flex w-fit items-center gap-3 rounded-full px-3 py-2 hover:bg-zinc-200 md:mb-2 ${
        isActivating ? 'bg-zinc-200' : 'bg-transparent'
      } max-w-full`}
    >
      {leftIcon}
      <p className="truncate text-sm font-bold text-black">{title}</p>
    </Link>
  );
};
