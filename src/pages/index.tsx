import { Inter } from 'next/font/google';
import Head from 'next/head';
import Landing from '@/components/Landing';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Hoyodle</title>
        <meta name="description" content="The daily HoYoverse guessing game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Landing />
    </>
  )
}
