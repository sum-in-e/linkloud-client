'use client';

const MenuListLoading = () => {
  return (
    <section className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-10 w-full animate-pulse rounded-full bg-gray-300"
        />
      ))}
    </section>
  );
};

export default MenuListLoading;
