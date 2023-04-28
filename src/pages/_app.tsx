import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
      <footer>
        Honkai: Star Rail and Genshin Impact are registered trademark of miHoYo Co., Ltd. HoYoDLE is not affiliated or in any way officially connected with miHoYo.
      </footer>
    </ChakraProvider>
  )

}
