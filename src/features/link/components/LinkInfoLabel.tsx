const LinkInfoLabel = ({
  title,
  htmlFor,
  isShowHighlight,
}: {
  title: string;
  htmlFor?: string;
  isShowHighlight?: boolean;
}) => {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold text-zinc-500">
      {title}
    </label>
  );
};

export default LinkInfoLabel;
