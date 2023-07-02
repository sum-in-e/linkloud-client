'use client';

import { useLinkAnalyzeMutation } from '@/features/link/modules/apiHooks/useLinkAnalyzeMutation';
import {
  useLinkState,
  useShowLinkEditorState,
} from '@/features/link/modules/stores/createLinkStore';
import { useToast } from '@chakra-ui/react';
import { FormEvent, useEffect, useState } from 'react';

const LinkFetcher = () => {
  const toast = useToast();

  const { setLink } = useLinkState();
  const { setIsShowLinkEditor } = useShowLinkEditorState();

  const [url, setUrl] = useState('');

  const { mutate, isLoading } = useLinkAnalyzeMutation();

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
    getLinkInfo(); // 입력된 링크의 정보를 가져온다
  };

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const fetchClipboardText = async () => {
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText(); // 클립보드에서 텍스트 읽기

        // 텍스트에서 링크 찾기
        const linkRegex = /https?:\/\/\S+/gi;
        const match = text.match(linkRegex);

        if (match) {
          setUrl(match[0]);
        }
      } catch (error) {
        // 에러 처리
      }
    }
  };

  useEffect(() => {
    // 사파리(권한 요청 방식도 다르고 애매해서 배제) 아닌 경우에만 클립보드 접근 시도
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) {
      fetchClipboardText();
    }

    setUrl(''); // 진입 시 url input 초기화
  }, []);

  return isLoading ? (
    <div className="flex h-32 w-full items-center justify-center rounded-lg bg-blue-100">
      <p className="text-sm font-semibold">링크 정보를 가져오고 있어요!</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-1">
      <input
        type="url"
        placeholder="이곳에 링크를 붙여넣으세요🔗"
        className="common-input h-10 w-full bg-slate-100"
        value={url}
        onChange={handleChangeUrl}
        autoFocus
      />
      <button
        type="submit"
        className="common-button  h-10 bg-gray-700 px-5 font-bold text-white hover:bg-gray-500"
        disabled={url.length === 0}
      >
        링크 정보 가져오기
      </button>
    </form>
  );
};

export default LinkFetcher;
