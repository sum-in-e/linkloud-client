'use client';

const MenuListLoading = () => {
  return (
    <section className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="skeleton h-10 w-full rounded-full" />
      ))}
    </section>
  );
};

export default MenuListLoading;
