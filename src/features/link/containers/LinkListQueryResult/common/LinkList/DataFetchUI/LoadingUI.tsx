'use client';

const LinkListLoadingUI = () => {
  return (
    <ul
      className={`grid grid-cols-[repeat(auto-fill,minmax(calc(50%-10px),1fr))] grid-rows-[1fr] gap-5 md:grid-cols-[repeat(auto-fill,minmax(270px,1fr))]`}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="mb-14">
          <div className="skeleton aspect-[1.91/1] h-auto w-full rounded-lg" />
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
