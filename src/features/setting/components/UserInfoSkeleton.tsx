import { Skeleton } from '@chakra-ui/react';

const UserInfoSkeleton = () => {
  return (
    <section className="flex w-full flex-col items-center gap-2">
      <Skeleton width="280px" height="33px" />
      <Skeleton width="200px" height="20px" />
    </section>
  );
};

export default UserInfoSkeleton;
