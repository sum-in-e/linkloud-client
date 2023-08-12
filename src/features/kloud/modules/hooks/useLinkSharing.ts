import { useToast } from '@chakra-ui/react';

interface UseLinkSharingProps {
  title: string;
  url: string;
}

export const useLinkSharing = ({ title, url }: UseLinkSharingProps) => {
  const toast = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      // * Web Share API 지원하는 경우
      try {
        await navigator.share({
          title: 'Link sharing on Linkloud',
          text: title,
          url: url,
        });
      } catch (error) {
        //
      }
    } else {
      // * Web Share API 지원하지 않는 경우
      try {
        await navigator.clipboard.writeText(url);

        toast({
          title: '링크가 복사되었습니다.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: '링크 복사에 실패하였습니다.',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return { handleShare };
};
