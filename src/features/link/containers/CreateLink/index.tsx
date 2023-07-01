'use client';

import CreateLinkButton from '@/features/link/containers/CreateLink/Button';
import LinkMetaFetcherAndEditor from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor';
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
}

const CreateLink = ({ onClose }: Props) => {
  // * 임의의 디자인으로 기능만 구현중

  return (
    <Drawer isOpen={true} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">링크 추가하기</DrawerHeader>

        <DrawerBody>
          <LinkMetaFetcherAndEditor />
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <CreateLinkButton onClose={onClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateLink;
