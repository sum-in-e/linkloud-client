'use client';
import { useShowKloudSelectorState } from '@/features/link/modules/stores/createLinkStore';
import { BsArrowLeft } from 'react-icons/bs';

interface Props {
  onClose: () => void;
}

const BackButton = ({ onClose }: Props) => {
  const { isShowKloudSelector, setIsShowKloudSelector } =
    useShowKloudSelectorState();

  const handleClose = () => {
    setIsShowKloudSelector(false);
    if (!isShowKloudSelector) {
      onClose();
    }
  };

  return (
    <button
      type="button"
      className="w-fit rounded-full p-2"
      onClick={handleClose}
    >
      <BsArrowLeft size={18} />
    </button>
  );
};

export default BackButton;
