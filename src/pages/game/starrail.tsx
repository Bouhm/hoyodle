import Game from '@/components/Game'
import { useGlobalContext } from '@/components/hooks/useGlobalContext'
import useHSRAnswer from '@/components/hooks/useHSRAnswer'
import useHSRCharacters from '@/components/hooks/useHSRCharacters'
import { AbsoluteCenter, Box, Center, Container, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import bg from '../../../public/images/hsr_bg.webp'

export default function StarRail() {
  const { characters, isLoading: isCharactersLoading } = useHSRCharacters();
  const { answer, isLoading: isAnswerLoading } = useHSRAnswer();
  const { bgUrl, setBgUrl } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (characters && answer) {
      setIsLoading(false)
    }
  }, [isCharactersLoading, isAnswerLoading])

  useEffect(() => {
    // setBgUrl(bg.src)
  }, [bgUrl, setBgUrl])

  return (
    <Box>
      {
        isLoading ? <Spinner />
          :
          <Game characters={characters} answer={answer} />
      }
    </Box>
  )
}
