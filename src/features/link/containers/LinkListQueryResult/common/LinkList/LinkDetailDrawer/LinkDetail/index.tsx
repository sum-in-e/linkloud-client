'use client';

import { LinkInfoType } from '@/features/link/modules/apis/link';
import { useLinkSharing } from '@/features/kloud/modules/hooks/useLinkSharing';
import { MdOutlineOpenInNew, MdIosShare } from 'react-icons/md';
import { useOpenLink } from '@/features/kloud/modules/hooks/useOpenLink';
import LinkInfoWithEdit from '@/features/link/containers/LinkListQueryResult/common/LinkList/LinkDetailDrawer/LinkDetail/LinkInfoWithEdit';
import LinkDeleteButton from '@/features/link/containers/LinkListQueryResult/common/LinkList/LinkDetailDrawer/LinkDetail/LinkDeleteButton';

interface Props {
  onClose: () => void;
  link: LinkInfoType;
}

const LinkDetail = ({ link, onClose }: Props) => {
  const { id, url, title, isRead } = link;

  const { handleClickShare } = useLinkSharing({ title, url });
  const { openLinkInNewTap } = useOpenLink({ id, isRead, url });

  return (
    <div>
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          className="h-fit w-fit rounded-full bg-black p-2"
          onClick={openLinkInNewTap}
        >
          {/* 아직 읽지 않은 링크네요. 읽어보시겠어요? 이런식 버튼도 괜찮을듯 */}
          <MdOutlineOpenInNew size={15} className="fill-gray-200" />
        </button>
        <button
          type="button"
          className="h-fit w-fit rounded-full bg-black p-2"
          onClick={handleClickShare}
        >
          <MdIosShare size={15} className="fill-gray-200" />
        </button>
      </div>
      <LinkInfoWithEdit link={link} onClose={onClose} />
      <LinkDeleteButton id={id} onClose={onClose} />
    </div>
  );
};

export default LinkDetail;
