import Game from '@/components/Game'
import { useGlobalContext } from '@/components/hooks/useGlobalContext'
import useHSRAnswer from '@/components/hooks/useHSRAnswer'
import useHSRCharacters from '@/components/hooks/useHSRCharacters'
import { AbsoluteCenter, Box, Center, Container, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HonkaiStarRail() {
  const { characters, isLoading: isCharactersLoading } = useHSRCharacters();
  const { answer, isLoading: isAnswerLoading } = useHSRAnswer();
  const { bgUrl, setBgUrl } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (characters && answer) {
      setIsLoading(false)
    }
  }, [isCharactersLoading, isAnswerLoading, answer, characters, setIsLoading])

  useEffect(() => {
    // setBgUrl(bg.src)
  }, [bgUrl, setBgUrl])

  return (
    <Box>
      <Center><Image src="/images/hsr/choochoo.webp" alt="Honkai: Star Rail" width={1191 / 2} height={720 / 2} style={{ opacity: 0.6 }} /></Center>
      {
        isLoading ? <AbsoluteCenter><Spinner /></AbsoluteCenter>
          :
          <Game characters={characters} answer={answer} />
      }
    </Box>
  )
}
