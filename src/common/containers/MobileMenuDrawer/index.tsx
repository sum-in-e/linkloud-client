'use client';

import MenuListWithCreateLink from '@/common/containers/MenuListWithCreateLink';
import AllButton from '@/common/containers/MenuButton/All';
import CollectionButton from '@/common/containers/MenuButton/Collection';
import UncategorizedButton from '@/common/containers/MenuButton/Uncategorized';
import UnreadButton from '@/common/containers/MenuButton/Unread';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { BsArrowBarLeft } from 'react-icons/bs';
import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import KloudMenuList from '@/common/containers/MobileMenuDrawer/KloudMenuList';

interface Props {
  onClose: () => void;
}

const MobileMenuDrawer = ({ onClose }: Props) => {
  const { data, isLoading, refetch } = useGetGroupMenuListQuery();

  if (isLoading) {
    // TODO: 로딩 UI - 클라우드까지
    return <div />;
    // return <MenuListLoading />;
  }

  if (!data) {
    // TODO: 에러 UI - 클라우드까지
    const handleRefetch = () => {
      refetch();
    };
    return <div />;
    // return <MenuListError onRetry={handleRefetch} />;
  }

  return (
    <Drawer placement="left" onClose={onClose} isOpen={true}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-end">
          <button onClick={onClose} className="rounded-lg bg-zinc-100 p-1">
            <BsArrowBarLeft size={18} />
          </button>
        </DrawerHeader>

        <DrawerBody>
          <AllButton onClick={onClose} />
          <CollectionButton onClick={onClose} />
          <UnreadButton isShowMark={data.unread > 0} onClick={onClose} />
          <UncategorizedButton
            isShowMark={data.uncategorized > 0}
            onClick={onClose}
          />
          <KloudMenuList klouds={data.klouds} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileMenuDrawer;
