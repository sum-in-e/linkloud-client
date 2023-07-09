'use client';

import LinkDetail from '@/features/kloud/containers/ResultContainer/LinkListSection/LinkDetailDrawer/LinkDetail';
import { LinkInfoType } from '@/features/link/modules/apis/link';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

interface Props {
  onClose: () => void;
  link: LinkInfoType;
}

const LinkDetailDrawer = ({ onClose, link }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer isOpen={true} placement="right" onClose={handleClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">상세정보</DrawerHeader>

        <DrawerBody>
          <LinkDetail link={link} onClose={handleClose} />
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          {/* <CreateLinkButton onClose={handleClose} /> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LinkDetailDrawer;
