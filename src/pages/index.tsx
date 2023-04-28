import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Hoyodle</title>
        <meta name="description" content="The daily HoYoverse guessing game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} />
    </>
  )
}
