'use client';

interface Props {
  title: string;
  count: number;
}

const TitleAndCount = ({ title, count }: Props) => {
  return (
    <div className="flex items-center gap-3 py-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="rounded-full bg-primary px-2 py-1">
        <p className="text-xs font-semibold text-white">{count}</p>
      </div>
    </div>
  );
};
export default TitleAndCount;
