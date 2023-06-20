import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import MyKloud from '@/features/kloud/containers';

export const metadata = {
  title: 'Linkloud | MyKloud',
  description: LINKLOUD_SLOGAN,
};

export default async function MyKloudPage() {
  return <MyKloud />;
}
