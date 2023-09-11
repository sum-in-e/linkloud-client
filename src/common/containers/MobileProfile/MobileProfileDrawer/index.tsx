'use client';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { BsArrowBarRight } from 'react-icons/bs';
import HelpAndInfoArea from '@/common/containers/HelpAndInfoArea';
import LogOutArea from '@/features/auth/LogOut';
import SignOutArea from '@/features/auth/SignOut';

import ProfileArea from '@/common/containers/MobileProfile/MobileProfileDrawer/Profile';

interface Props {
  onClose: () => void;
}

const MobileProfileDrawer = ({ onClose }: Props) => {
  return (
    <Drawer placement="right" onClose={onClose} isOpen={true}>
      <DrawerOverlay className="vh-full" />
      <DrawerContent className="vh-full">
        <DrawerHeader className="flex items-center justify-start">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border p-1"
          >
            <BsArrowBarRight size={18} />
          </button>
        </DrawerHeader>

        <DrawerBody className="flex flex-col justify-between gap-5 pb-8">
          <ProfileArea />
          <div>
            <div className="mb-5 flex flex-col gap-4 px-2">
              <HelpAndInfoArea />
              <LogOutArea />
            </div>
            <div className="border-t px-2 pt-5">
              <p className="text-xs font-semibold text-red-500">
                DANGER ZONE
              </p>
              <div className="mt-4">
                <SignOutArea />
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileProfileDrawer;
