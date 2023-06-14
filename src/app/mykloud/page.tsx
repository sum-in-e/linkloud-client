import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';

export const metadata = {
  // TODO: generateMatadata로 현재 카테고리 띄우기
  title: 'Linkloud | MyKloud',
  description: LINKLOUD_SLOGAN,
};

export default function MyKloudPage() {
  return <h1 className="md:text-2xl">MyKloud</h1>;
}
