'use client';

import { BsX } from 'react-icons/bs';
import KloudSelector from '@/features/kloud/containers/KloudSelector';
import LinkInfoHanlder from '@/features/link/containers/CreateLink/LinkMetaFetcherAndEditor/LinkEditor/LinkInfoHandler';
import {
  useLinkState,
  useShowKloudSelectorState,
} from '@/features/link/modules/stores/createLinkStore';
import BackButton from '@/features/link/containers/CreateLink/BackButton';
import { useCreateLinkHook } from '@/features/link/modules/hooks/useCreateLinkHook';
import Loader from '@/common/components/Loader';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';

interface Props {
  onClose: () => void;
}

const LinkEditor = ({ onClose }: Props) => {
  const { link, setLink } = useLinkState();
  const { isShowKloudSelector, setIsShowKloudSelector } =
    useShowKloudSelectorState();

  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleKloudSelectMode = (state: boolean) => {
    setIsShowKloudSelector(state);
  };

  const kloudId = link.kloud === null ? null : link.kloud.id;

  const handleSelectKloud = (kloudId: number | null, kloudName: string) => {
    setLink({
      kloud: kloudId === null ? null : { id: kloudId, name: kloudName },
    });
    handleKloudSelectMode(false);
  };

  const { onCreateLinkMutate, isLoading, isDisabled } = useCreateLinkHook({
    onClose,
  });

  return (
    <article className="w-full">
      {isShowKloudSelector ? (
        <div>
          <div className="flex items-center justify-between p-3 md:px-5">
            <BackButton onClose={() => handleKloudSelectMode(false)} />
          </div>
          <KloudSelector kloudId={kloudId} onChange={handleSelectKloud} />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between p-3 md:px-5">
            {!isMobile ? (
              <button
                type="button"
                className="w-fit rounded-full py-2"
                onClick={onClose}
              >
                <BsX size={25} />
              </button>
            ) : (
              <BackButton onClose={onClose} />
            )}
            <button
              type="button"
              className="reset-button w-fit min-w-[81px] rounded-2xl bg-black px-4 py-2 text-sm font-bold text-white md:hidden"
              onClick={onCreateLinkMutate}
              disabled={isDisabled}
            >
              {isLoading ? <Loader /> : '추가하기'}
            </button>
          </div>
          <LinkInfoHanlder handleKloudSelectMode={handleKloudSelectMode} />
          <div className="w-full p-3 md:px-5">
            <button
              type="button"
              className="reset-button hidden rounded-xl bg-black px-4 py-3 text-sm font-bold text-white hover:bg-zinc-700 md:block"
              onClick={onCreateLinkMutate}
              disabled={isDisabled}
            >
              {isLoading ? <Loader /> : '추가하기'}
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default LinkEditor;
