import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import MySetting from '@/features/setting/containers';

export const metadata = {
  title: 'Linkloud | 마이페이지',
  description: LINKLOUD_SLOGAN,
};

export default async function SettingPage() {
  return <MySetting />;
}
