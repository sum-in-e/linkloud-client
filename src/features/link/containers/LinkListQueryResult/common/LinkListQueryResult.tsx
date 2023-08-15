'use client';

import { ReactElement, useState } from 'react';
import LinkList from '@/features/link/containers/LinkListQueryResult/common/LinkList';
import LinkSelectModeHandler from '@/features/link/containers/LinkListQueryResult/common/LinkSelectModeHandler';
import { GetLinkListData } from '@/features/link/modules/apis/link';

export interface Props {
  Header: ReactElement;
  data?: GetLinkListData;
  isLoading: boolean;
  offset: number;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

export const LinkListQueryResult = ({
  Header,
  data,
  isLoading,
  offset,
  nextPage,
  previousPage,
  goToPage,
}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectItem = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const resetSelectedIds = () => {
    if (selectedIds.length > 0) setSelectedIds([]);
  };

  const handleNextPage = () => {
    nextPage();
    resetSelectedIds();
  };
  const handlePreviousPage = () => {
    previousPage();
    resetSelectedIds();
  };
  const handleGoToPage = (page: number) => {
    goToPage(page);
    resetSelectedIds();
  };

  const handleEnabledEditMode = () => {
    setIsEditMode(true);
  };

  const handleDisabledEditMode = () => {
    setIsEditMode(false);
    resetSelectedIds();
  };

  const count = data?.count || 0;
  const isDisabledActivationButton = count === 0;

  return (
    <section className="flex h-full w-full flex-col">
      {Header}
      <div className="flex items-center justify-end pb-4 pt-1">
        <LinkSelectModeHandler
          isEditMode={isEditMode}
          onEnableEditMode={handleEnabledEditMode}
          onDisableEditMode={handleDisabledEditMode}
          selectedIds={selectedIds}
          isDisabledActivationButton={isDisabledActivationButton}
        />
      </div>
      <LinkList
        data={data}
        isLoading={isLoading}
        isEditMode={isEditMode}
        selectedIds={selectedIds}
        onSelectItem={handleSelectItem}
        offset={offset}
        nextPage={handleNextPage}
        previousPage={handlePreviousPage}
        goToPage={handleGoToPage}
      />
    </section>
  );
};
