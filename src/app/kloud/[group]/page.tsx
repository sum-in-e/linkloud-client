import MyKloud from '@/features/kloud/containers';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { group: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const group = params.group;

  const getText = () => {
    if (group === 'all') return '전체';
    if (group === 'unread') return '미열람';
    if (group === 'uncategorized') return '미분류';
    if (group === 'collection') return 'Collection';
    // TODO: id로 클라우드 이름 조회하고 해당 클라우드 이름 동적으로 들어가게 수정
    return group;
  };

  return {
    title: `MyKloud | ${getText()}`,
  };
}

export default async function MyKloudPage() {
  return <MyKloud />;
}
