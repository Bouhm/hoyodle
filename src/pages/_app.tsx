import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';

import type { AppProps } from 'next/app'
import theme from '@/styles/theme';
import { GlobalContextProvider } from '@/components/contexts/globalContexts';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <GlobalContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalContextProvider>
      </ChakraProvider>
    </>
  )

}
