import Game from '@/components/ClassicGame'
import { useGlobalContext } from '@/components/hooks/useGlobalContext'
import useHSRGame from '@/components/hooks/useHSRGame'
import useHSRCharacters from '@/components/hooks/useHSRCharacters'
import { AbsoluteCenter, Box, Center, Container, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'

export default function ClassicMode() {
  const { characters, isLoading: isCharactersLoading } = useHSRCharacters();
  const { game, isLoading: isAnswerLoading } = useHSRGame();

  return (
    <Box
      backgroundImage="url('/images/hsr/choochoo.webp')"
      backgroundSize="auto"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      width="100%"
      height="100%"
      paddingTop="2rem"
    >
      <Head>
        <title>Honkai: Star Rail Puzzle</title>
      </Head>
      {
        (isCharactersLoading || isAnswerLoading) ? <AbsoluteCenter><Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='purple.500'
          size='xl'
        /></AbsoluteCenter>
          :
          <Game characters={characters} gameId={game._id} answer={game.classicAnswer} imgPath="hsr" />
      }
    </Box>
  )
}
