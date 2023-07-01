'use client';

import { useGetKloudListQuery } from '@/features/kloud/modules/apiHooks/useGetKloudListQuery';

interface Props {
  kloudId: number | null;
  onSelect: (id: number | null) => void;
}
const KloudList = ({ kloudId, onSelect }: Props) => {
  const { data } = useGetKloudListQuery();

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-semibold text-gray-500">
        <p>내 클라우드</p>
        <p>{data?.count || 0}</p>
      </div>

      {!data || data.klouds.length === 0 ? (
        <div className="flex h-20 w-full items-center justify-center bg-stone-100">
          <p className="text-sm font-semibold text-gray-500">
            ☁️ 보유한 클라우드가 없어요 ☁️
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1">
          <li>
            <button
              type="button"
              className={`common-button flex items-center justify-between  px-4 ${
                kloudId === null ? 'bg-blue-50' : 'bg-stone-100'
              }`}
              onClick={() => onSelect(null)}
            >
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                미분류
              </p>
            </button>
          </li>
          {data.klouds.map((kloud) => (
            <li key={kloud.id}>
              <button
                type="button"
                className={`common-button flex items-center justify-between  px-4 ${
                  kloudId === kloud.id ? 'bg-blue-50' : 'bg-stone-100'
                }`}
                onClick={() => onSelect(kloud.id)}
              >
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {kloud.name}
                </p>
                <p>{kloud.linkCount}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KloudList;
