import Pagination from '@/common/components/Pagination';
import { linkListLimit } from '@/features/link/containers/LinkListQueryResult/ForNotKloud';
import LinkList from '@/features/link/containers/LinkListQueryResult/common/LinkList';
import EditModeHandler from '@/features/link/containers/LinkListQueryResult/common/LinkList/EditModeHandler';
import { GetLinkListData } from '@/features/link/modules/apis/link';

import { ReactElement, useState } from 'react';

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
  const count = data?.count || 0;

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
    <section className="relative flex h-full w-full flex-col justify-between md:ml-10">
      {Header}
      <div className="flex items-center justify-end pb-5">
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
      <div className="overflow-scroll">
        <LinkList
          isLoading={isLoading}
          data={data}
          isEditMode={isEditMode}
          selectedIds={selectedIds}
          onSelectItem={handleSelectItem}
        />
        <div className="py-5">
          <Pagination
            totalItems={count}
            limit={linkListLimit}
            offset={offset}
            nextPage={nextPage}
            previousPage={previousPage}
            goToPage={goToPage}
          />
        </div>
      </div>
    </section>
  );
};
