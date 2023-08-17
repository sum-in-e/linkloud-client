'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

const ChakraUiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider
        toastOptions={{ defaultOptions: { position: 'bottom-left' } }}
      >
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
};

export default ChakraUiProvider;
