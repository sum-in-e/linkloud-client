'use client';

import KloudHandler from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkEditor/KloudHandler';
import LinkInfoHanlder from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkEditor/LinkInfoHandler';

const LinkEditor = () => {
  return (
    <article className="w-[300px]">
      <LinkInfoHanlder />
      <KloudHandler />
    </article>
  );
};

export default LinkEditor;
