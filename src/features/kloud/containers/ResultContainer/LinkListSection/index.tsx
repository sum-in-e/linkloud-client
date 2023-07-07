'use client';

import { useState } from 'react';
import EditModeHandler from '@/features/kloud/containers/ResultContainer/LinkListSection/EditModeHandler';
import LinkItem from '@/features/link/containers/LinkItem';
import { GetLinkListData } from '@/features/link/modules/apis/link';

interface Props {
  data: GetLinkListData | undefined;
  isLoading: boolean;
}

const LinkListHanlder = ({ data, isLoading }: Props) => {
  if (isLoading) {
    // TODO: 스켈레톤 보여주기
    return <p>로딩중</p>;
  }

  if (!data) {
    // TODO: 데이터를 불러오지 못했다고 보여주기
    return <p>데이터가 존재하지 않습니다.</p>;
  }

  const { links, count } = data;

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectItem = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const handleEnabledEditMode = () => {
    setIsEditMode(true);
  };

  const handleDisabledEditMode = () => {
    setIsEditMode(false);
    setSelectedIds([]);
  };

  const isDisabledEditModeActivationButton = count === 0;

  return (
    <section>
      <div className="flex items-center justify-end">
        <EditModeHandler
          isEditMode={isEditMode}
          onEnableEditMode={handleEnabledEditMode}
          onDisableEditMode={handleDisabledEditMode}
          selectedIds={selectedIds}
          isDisabledEditModeActivationButton={
            isDisabledEditModeActivationButton
          }
        />
      </div>
      {links.length === 0 ? (
        // TODO: 링크 없음 UI 작업 -> 디자인 반영 시
        // 선택한 메뉴에 링크가 없는 UI, 검색 결과가 없는 UI 분기 나눠서 보여주기
        <p>링크가 존재하지 않습니다.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              isEditMode={isEditMode}
              isSelected={selectedIds.includes(link.id)}
              onSelectItem={handleSelectItem}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default LinkListHanlder;
