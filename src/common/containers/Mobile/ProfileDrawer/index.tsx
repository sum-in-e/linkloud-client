'use client';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { BsXLg } from 'react-icons/bs';
import HelpAndInfoArea from '@/common/containers/Mobile/ProfileDrawer/HelpAndInfoButton';
import SignOutButton from '@/features/auth/SignOut/SignOutButton';
import LogOutButton from '@/common/containers/Mobile/ProfileDrawer/LogOutButton';
import UserInfoContainer from '@/common/containers/Mobile/ProfileDrawer/UserInfoContainer';

interface Props {
  onClose: () => void;
}

const MobileProfileDrawer = ({ onClose }: Props) => {
  return (
    <Drawer placement="right" onClose={onClose} isOpen={true}>
      <DrawerOverlay className="vh-full" />
      <DrawerContent className="vh-full">
        <DrawerHeader className="flex items-center justify-end">
          <button type="button" onClick={onClose}>
            <BsXLg size={18} />
          </button>
        </DrawerHeader>
        <DrawerBody className="flex flex-col justify-between gap-5 pb-8">
          <UserInfoContainer />
          <div>
            <div className="mb-5 flex flex-col gap-4 px-2">
              <HelpAndInfoArea />
              <LogOutButton />
            </div>
            <div className="border-t px-2 pt-5">
              <h6 className="text-xs font-semibold text-red-500">
                DANGER ZONE
              </h6>
              <div className="mt-4">
                <SignOutButton />
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileProfileDrawer;
