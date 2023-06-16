const InputFormContainer = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full flex-col justify-center gap-1">
      <p className="text-xs text-gray-600">{label}</p>
      {children}
    </div>
  );
};

export default InputFormContainer;
