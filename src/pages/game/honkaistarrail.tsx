import Game from '@/components/Game'
import { useGlobalContext } from '@/components/hooks/useGlobalContext'
import useHSRGame from '@/components/hooks/useHSRGame'
import useHSRCharacters from '@/components/hooks/useHSRCharacters'
import { AbsoluteCenter, Box, Center, Container, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import useHSRPlays from '@/components/hooks/useHSRPlays'

export default function HonkaiStarRail() {
  const { characters, isLoading: isCharactersLoading } = useHSRCharacters();
  const { game, isLoading: isAnswerLoading } = useHSRGame();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (characters && game) {
      setIsLoading(false)
    }
  }, [isCharactersLoading, isAnswerLoading, game, characters, setIsLoading])

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
        isLoading ? <AbsoluteCenter><Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='purple.500'
          size='xl'
        /></AbsoluteCenter>
          :
          <Game game={game} characters={characters} imgPath="hsr" />
      }
    </Box>
  )
}
