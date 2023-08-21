'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useLinkAnalyzeMutation } from '@/features/link/modules/apiHooks/useLinkAnalyzeMutation';
import {
  useLinkState,
  useShowLinkEditorState,
} from '@/features/link/modules/stores/createLinkStore';
import Loader from '@/common/components/Loader';
import { BsPlus, BsX } from 'react-icons/bs';

const LinkFetcher = () => {
  const toast = useToast();

  const { setLink } = useLinkState();
  const { setIsShowLinkEditor } = useShowLinkEditorState();

  const [url, setUrl] = useState('');

  const { mutate, isLoading } = useLinkAnalyzeMutation();

  const handleReset = () => {
    setUrl('');
  };

  const handleMutate = () => {
    mutate(
      { url },
      {
        onSuccess: (data) => {
          setLink({
            url: data.data.url,
            title: data.data.title,
            description: data.data.description,
            thumbnailUrl: data.data.thumbnailUrl,
            kloud: null,
          });
          setIsShowLinkEditor(true);
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '링크 정보 가져오기에 실패하였습니다. 다시 시도해 주세요.';

            toast({
              title: message,
              status: 'warning',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  const getLinkInfo = () => {
    try {
      new URL(url); // URL이면 링크 정보 가져오기
      handleMutate();
    } catch (error) {
      toast({
        title: '유효하지 않은 형식의 링크입니다.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getLinkInfo();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // 키보드 닫기
    }
  };

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const fetchClipboardText = async () => {
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText(); // 클립보드에서 텍스트 읽기

        // 텍스트가 유효한 URL인지 검사하기
        try {
          new URL(text);
          // 에러가 발생하지 않으면 유효한 URL
          setUrl(text);
        } catch (urlError) {
          // 유효하지 않은 URL
        }
      } catch (clipboardError) {
        // 클립보드 읽기 에러 처리
      }
    }
  };

  useEffect(() => {
    // 사파리(권한 요청 방식도 다르고 애매해서 배제) 아닌 경우에만 클립보드 접근 시도
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) {
      fetchClipboardText();
    }

    setUrl('');
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-between border-b"
    >
      <div className="flex w-9 flex-shrink-0 items-center justify-center">
        {isLoading ? (
          <Loader theme="black" size={20} />
        ) : (
          <BsPlus size={25} className="fill-zinc-500" />
        )}
      </div>
      <input
        type="url"
        placeholder="어떤 링크를 저장해 볼까요?👀"
        className="h-10 w-full outline-none"
        value={url}
        onChange={handleChangeUrl}
        autoFocus
      />
      <div className="px-2 md:hidden">
        <button
          type="button"
          className="flex items-center justify-center rounded-full bg-zinc-300 p-[2px]"
          onClick={handleReset}
        >
          <BsX size={16} />
        </button>
      </div>
    </form>
  );
};

export default LinkFetcher;
