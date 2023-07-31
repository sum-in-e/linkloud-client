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
      className={`color-duration mb-2 flex items-center gap-3 rounded-full px-3 py-2 text-lg font-bold hover:bg-slate-100 ${
        isActivating ? 'bg-slate-100' : 'bg-transparent'
      } max-w-full`}
    >
      {leftIcon}
      <p className="truncate text-sm">{title}</p>
    </button>
  );
};
