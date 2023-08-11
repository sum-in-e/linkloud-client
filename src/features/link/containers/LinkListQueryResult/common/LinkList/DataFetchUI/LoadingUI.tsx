'use client';

const LinkListLoadingUI = () => {
  return (
    <ul className="flex flex-wrap justify-center gap-3 md:justify-normal">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index} className="aspect-square w-[270px]">
          <div className="skeleton h-1/2 w-full rounded-lg" />
          <div className="p-2 pt-4">
            <div className="skeleton mb-3 h-3 w-full rounded-xl" />
            <div className="skeleton mb-1 h-4 w-1/3 rounded-xl" />
            <div className="skeleton h-3 w-full rounded-xl" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LinkListLoadingUI;
