'use client';

interface Props {
  title: string;
  count: number;
}

const TitleAndCount = ({ title, count }: Props) => {
  return (
    <div className="pt-4">
      <span className="break-all text-xl font-bold">{title}</span>
      <div className="relative ml-2 inline-flex">
        <span className="text-sm font-semibold">{count}</span>
        <div className="absolute bottom-[1px] left-0 h-2/5 w-full rounded-full bg-secondary bg-opacity-40" />
      </div>
    </div>
  );
};
export default TitleAndCount;
