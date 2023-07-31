'use client';

const MenuListLoading = () => {
  return (
    <section className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-11 w-full animate-pulse rounded-full bg-gray-300"
        />
      ))}
    </section>
  );
};

export default MenuListLoading;
