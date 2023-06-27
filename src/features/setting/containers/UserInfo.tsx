import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import { RiKakaoTalkFill } from 'react-icons/ri';

const UserInfo = () => {
  const { data } = useGetSessionQuery();

  const info = data?.data;

  const name = info?.name || '유저';
  const email = info?.email || '';

  return (
    <section className="flex w-full flex-col items-center gap-2">
      <div className="flex items-end gap-1">
        <h1 className="text-2xl font-bold">{`${name} 님, 반가워요!`}</h1>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">{email}</p>
          {info?.method === 'kakao' && (
            <div className="h-fit w-fit rounded-full bg-[#FAE100] p-1">
              <RiKakaoTalkFill />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
