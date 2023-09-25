import useHSRGame from '@/components/hooks/useHSRGame';
import { AbsoluteCenter, Avatar, Box, Center, Container, Flex, Heading, Spinner, VStack } from '@chakra-ui/react'
import MessagesGame from "@/components/MessagesGame";
import useHSRCharacters from '@/components/hooks/useHSRCharacters';
import Head from 'next/head';
import useSWR from 'swr';
import fetcher from '@/components/hooks/fetcher';

export default function Messages() {
  const { characters, isLoading: isCharactersLoading } = useHSRCharacters();
  const { game, isLoading: isGameLoading } = useHSRGame();
  const { data: message } = useSWR(game ? 'https://hoyodle.fly.dev/api/v1/hsr/messages/' + game.messagesAnswer : null, fetcher)

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
        (isCharactersLoading || isGameLoading || !message) ? (
          <AbsoluteCenter>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='purple.500'
              size='xl'
            />
          </AbsoluteCenter>)
          :
          <MessagesGame characters={characters} gameId={game._id} message={message} imgPath="hsr" />
      }
    </Box>
  )
}
