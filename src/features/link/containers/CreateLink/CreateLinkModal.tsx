'use client';

import CustomModal from '@/common/components/CustomModal';
import {
  useShowKloudSelectorState,
  useShowLinkEditorState,
} from '@/features/link/modules/stores/createLinkStore';
import LinkEditor from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkEditor';
import LinkFetcher from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkFetcher';
import BackButton from '@/features/link/containers/CreateLink/BackButton';

interface Props {
  onCloseModal: () => void;
}

const CreateLinkModal = ({ onCloseModal }: Props) => {
  const { isShowLinkEditor, setIsShowLinkEditor } = useShowLinkEditorState();
  const { setIsShowKloudSelector } = useShowKloudSelectorState();

  const handleClose = () => {
    setIsShowLinkEditor(false);
    setIsShowKloudSelector(false);
    onCloseModal();
  };

  return (
    <CustomModal onClose={handleClose}>
      <div className="flex h-screen w-screen flex-col bg-white md:h-fit md:w-fit md:rounded-lg ">
        {isShowLinkEditor ? (
          <div className="flex justify-center md:w-[400px]">
            <LinkEditor onClose={handleClose} />
          </div>
        ) : (
          <div className="flex flex-col md:w-[500px]">
            <div className="flex items-center justify-between p-3 md:hidden md:px-5">
              <BackButton onClose={onCloseModal} />
            </div>
            <div className="p-3 md:px-5">
              <LinkFetcher />
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
};
export default CreateLinkModal;
