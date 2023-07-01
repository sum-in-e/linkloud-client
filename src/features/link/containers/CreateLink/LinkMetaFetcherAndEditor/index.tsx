'use client';

import LinkFetcher from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkFetcher';
import LinkEditor from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkEditor';
import { useState } from 'react';

const LinkMetaFetcherAndEditor = () => {
  const [isShowLinkEditor, setIsShowLinkEditor] = useState(false);

  const handleShowLinkEditor = (isShow: boolean) => {
    setIsShowLinkEditor(isShow);
  };

  return (
    <section className="flex flex-col items-center gap-2">
      {isShowLinkEditor ? (
        <LinkEditor handleShowLinkEditor={handleShowLinkEditor} />
      ) : (
        <LinkFetcher handleShowLinkEditor={handleShowLinkEditor} />
      )}
    </section>
  );
};

export default LinkMetaFetcherAndEditor;
