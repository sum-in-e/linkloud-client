'use client';

import LinkFetcher from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkFetcher';
import LinkEditor from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkEditor';
import { useShowLinkEditorState } from '@/features/link/modules/stores/createLinkStore';

const LinkMetaFetcherAndEditor = () => {
  const { isShowLinkEditor } = useShowLinkEditorState();

  return (
    <section className="flex flex-col items-center gap-2">
      {isShowLinkEditor ? <LinkEditor /> : <LinkFetcher />}
    </section>
  );
};

export default LinkMetaFetcherAndEditor;
