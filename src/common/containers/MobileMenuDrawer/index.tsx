'use client';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { BsArrowBarLeft } from 'react-icons/bs';
import KloudMenuList from '@/features/kloud/containers/KloudMenuList';
import NotKloudMenuList from '@/common/containers/MobileMenuDrawer/NotKloudMenuList';

interface Props {
  onClose: () => void;
}

const MobileMenuDrawer = ({ onClose }: Props) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={true}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border p-1"
          >
            <BsArrowBarLeft size={18} />
          </button>
        </DrawerHeader>

        <DrawerBody className="pb-8">
          <NotKloudMenuList onCloseDrawer={onClose} />
          <KloudMenuList onCloseDrawer={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileMenuDrawer;
