import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';

export const metadata = {
  title: 'Linkloud | 마이페이지',
  description: LINKLOUD_SLOGAN,
};

export default function MyPage() {
  return <h1 className="md:text-2xl">마이페이지</h1>;
}
