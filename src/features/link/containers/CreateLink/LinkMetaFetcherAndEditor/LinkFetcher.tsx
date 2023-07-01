'use client';

import { useLinkAnalyzeMutation } from '@/features/link/modules/apiHooks/useLinkAnalyzeMutation';
import { useLinkState } from '@/features/link/modules/stores/createLinkStore';
import { useToast } from '@chakra-ui/react';
import { FormEvent, useEffect, useState } from 'react';

interface Props {
  handleShowLinkEditor: (isShow: boolean) => void;
}

const LinkFetcher = ({ handleShowLinkEditor }: Props) => {
  const toast = useToast();

  const { setLink } = useLinkState();

  const [url, setUrl] = useState('');

  const { mutate, data, isSuccess, isError, error, isLoading } =
    useLinkAnalyzeMutation();

  const getLinkInfo = () => {
    try {
      new URL(url); // URL이면 링크 정보 가져오기
      mutate({ url });
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

  useEffect(() => {
    if (isSuccess) {
      setLink({
        url: data.data.url,
        title: data.data.title,
        description: data.data.description,
        thumbnailUrl: data.data.thumbnailUrl,
      });
      handleShowLinkEditor(true);
    }
  }, [data, isSuccess, setLink, handleShowLinkEditor]);

  useEffect(() => {
    if (isError) {
      const message = error.response?.data.message;

      toast({
        title:
          message || '링크 정보 가져오기에 실패하였습니다. 다시 시도해 주세요.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isError, error, toast]);

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
        className="flex h-10 w-full items-center  justify-center rounded-2xl bg-gray-700 px-5 py-3 text-sm font-bold text-white hover:bg-gray-500 disabled:bg-gray-400"
        disabled={url.length === 0}
      >
        링크 정보 가져오기
      </button>
    </form>
  );
};

export default LinkFetcher;
