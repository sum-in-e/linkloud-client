'use client';

import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  klouds: KloudListKloudType[];
}

const KloudMenuList = ({ klouds }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (id: number) => {
    router.push(`/link/kloud/${id}`);
  };

  return <ul></ul>;
};

export default KloudMenuList;

// {klouds.map((kloud) => {
//   return (
//     <li key={`${kloud.id}_${kloud.name}`}>
//       <button
//         type="button"
//         onClick={() => handleClick(kloud.id)}
//         className={`${
//           pathname === `/link/kloud/${kloud.id}`
//             ? 'bg-primary-alt'
//             : 'bg-inherit'
//         }`}
//       >
//         {/*  */}
//       </button>
//     </li>
//   );
// })}
