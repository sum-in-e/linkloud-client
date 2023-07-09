'use client';

import CreateLinkButton from '@/features/link/containers/CreateLink/Button';
import LinkMetaFetcherAndEditor from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor';
import { useShowLinkEditorState } from '@/features/link/modules/stores/createLinkStore';
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
  const { setIsShowLinkEditor } = useShowLinkEditorState();

  const handleClose = () => {
    setIsShowLinkEditor(false);
    onClose();
  };

  return (
    <Drawer isOpen={true} placement="right" onClose={handleClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">링크 추가하기</DrawerHeader>

        <DrawerBody>
          <LinkMetaFetcherAndEditor />
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <CreateLinkButton onClose={handleClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateLink;
