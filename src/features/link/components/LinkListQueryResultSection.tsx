import { ReactNode } from 'react';

export const LinkListQueryResultSection = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <section className="flex h-full w-full flex-col justify-between md:ml-10">
      {children}
    </section>
  );
};
