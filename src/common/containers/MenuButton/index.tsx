export const MenuButton = ({
  leftIcon,
  title,
  onClick,
  isActivating,
}: {
  leftIcon: JSX.Element;
  title: string;
  onClick: () => void;
  isActivating: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`color-duration mb-1 flex items-center gap-3 rounded-full px-3 py-2 text-lg font-bold hover:bg-zinc-200 md:mb-2 ${
        isActivating ? 'bg-zinc-200' : 'bg-transparent'
      } max-w-full`}
    >
      {leftIcon}
      <p className="truncate text-sm">{title}</p>
    </button>
  );
};
