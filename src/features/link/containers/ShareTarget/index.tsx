'use client';

import KloudSelector from '@/features/kloud/containers/KloudSelector';
import { useCreateLinkMutation } from '@/features/link/modules/apiHooks/useCreateLinkMutation';
import { LinkAnalyzeData } from '@/features/link/modules/apis/link';
import { useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

interface Props {
  link: LinkAnalyzeData;
}

const LinkShareTarget = ({
  link: { url, title, description, thumbnailUrl },
}: Props) => {
  const toast = useToast();

  const { mutate, isLoading } = useCreateLinkMutation();

  const [kloudId, setKloudId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);

  const handleChangeKloud = (newKloudId: number | null) => {
    setKloudId(newKloudId);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(event.target.value);
  };

  const handleSave = async () => {
    mutate(
      {
        url,
        title: newTitle,
        description: newDescription,
        thumbnailUrl,
        kloudId,
      },
      {
        onSuccess: () => {
          // 성공했으니 닫기
          toast({
            title: '링크가 추가되었습니다!',
            status: 'success',
            duration: 1000,
            isClosable: true,
            onCloseComplete: () => {
              window.close();
            },
          });
        },
        onError: () => {
          toast({
            title: '링크 추가에 실패하였습니다. 다시 시도해 주세요.',
            status: 'warning',
            duration: 2000,
            isClosable: true,
          });
          // 실패했다고 알려주고 닫기
          //   window.close();
        },
      }
    );
  };

  return (
    <div className="w-full">
      {/*  취소, 저장 버튼 */}
      <div className="mb-3 flex w-full justify-between">
        <button type="button" className="font-semibold">
          취소
        </button>
        <button
          type="button"
          className="font-semibold"
          onClick={handleSave}
          disabled={isLoading || newTitle.length === 0}
        >
          저장
        </button>
      </div>
      {/* 링크 정보 편집 */}
      <picture>
        <img
          alt="thumbnail"
          src={thumbnailUrl}
          className="aspect-[1.91/1] w-full rounded-lg"
        />
      </picture>
      <p className="mb-3 truncate text-sm text-gray-500">{url}</p>
      <input
        value={newTitle}
        onChange={handleChangeTitle}
        className="common-input mb-3 bg-stone-100"
        placeholder="제목을 필수로 입력해 주세요!"
      />
      <textarea
        value={newDescription}
        onChange={handleChangeDescription}
        className="w-full resize-none rounded-2xl bg-stone-100 px-4 py-3 text-sm"
        placeholder="이 링크는 어떤 링크인가요?👀"
      />

      {/* Kloud 선택 */}
      <div className="mt-2 w-full">
        <KloudSelector kloudId={kloudId} onChange={handleChangeKloud} />
      </div>
    </div>
  );
};

export default LinkShareTarget;
