'use client';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { BsXLg } from 'react-icons/bs';
import KloudMenuList from '@/features/kloud/containers/KloudMenuList';
import MenuList from '@/common/containers/Mobile/MenuDrawer/MenuList';

interface Props {
  onClose: () => void;
}

const MobileMenuDrawer = ({ onClose }: Props) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={true}>
      <DrawerOverlay className="vh-full" />
      <DrawerContent className="vh-full">
        <DrawerHeader className="flex items-center justify-end">
          <button type="button" onClick={onClose}>
            <BsXLg size={18} />
          </button>
        </DrawerHeader>

        <DrawerBody className="pb-8">
          <MenuList onCloseDrawer={onClose} />
          <KloudMenuList onCloseDrawer={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileMenuDrawer;
