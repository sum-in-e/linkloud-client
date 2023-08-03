const LinkInfoLabel = ({
  title,
  htmlFor,
}: {
  title: string;
  htmlFor?: string;
}) => {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold text-zinc-500">
      {title}
    </label>
  );
};

export default LinkInfoLabel;
