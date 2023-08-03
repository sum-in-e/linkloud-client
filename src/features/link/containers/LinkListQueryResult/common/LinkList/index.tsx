'use client';

import { useState } from 'react';
import EditModeHandler from '@/features/link/containers/LinkListQueryResult/common/LinkList/EditModeHandler';
import LinkItem from '@/features/link/containers/LinkListQueryResult/common/LinkList/LinkItem';
import { GetLinkListData } from '@/features/link/modules/apis/link';

interface Props {
  data?: GetLinkListData;
  isLoading: boolean;
  isEditMode: boolean;
  onSelectItem: (id: number) => void;
  selectedIds: number[];
}

const LinkList = ({
  data,
  isLoading,
  isEditMode,
  onSelectItem,
  selectedIds,
}: Props) => {
  if (isLoading) {
    // TODO: 스켈레톤 보여주기
    return <p>로딩중</p>;
  }

  if (!data) {
    // TODO: 데이터를 불러오지 못했다고 보여주기
    return <p>데이터가 존재하지 않습니다.</p>;
  }

  const { links, count } = data;

  return links.length === 0 ? (
    // TODO: 링크 없음 UI 작업
    // 선택한 메뉴에 링크가 없는 UI, 검색 결과가 없는 UI 분기 나눠서 보여주기
    <p>링크가 존재하지 않습니다.</p>
  ) : (
    <ul className="flex flex-wrap justify-center gap-3 md:justify-normal">
      {links.map((link) => (
        <LinkItem
          key={link.id}
          link={link}
          isEditMode={isEditMode}
          isSelected={selectedIds.includes(link.id)}
          onSelectItem={onSelectItem}
        />
      ))}
    </ul>
  );
};
export default LinkList;
