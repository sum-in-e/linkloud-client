'use client';

import KloudHandler from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkEditor/KloudHandler';
import LinkInfoHanlder from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkEditor/LinkInfoHandler';
interface Props {
  handleShowLinkEditor: (isShow: boolean) => void;
}

const LinkEditor = ({ handleShowLinkEditor }: Props) => {
  return (
    <article className="w-[300px]">
      <LinkInfoHanlder handleShowLinkEditor={handleShowLinkEditor} />
      <KloudHandler />
    </article>
  );
};

export default LinkEditor;
