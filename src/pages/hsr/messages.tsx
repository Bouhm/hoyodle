
import { AbsoluteCenter, Avatar, Box, Center, Container, Flex, Heading, Spinner, VStack } from '@chakra-ui/react'
import Chat, { Message } from "../../components/Chat";

const messages: Message[] = [
  {
    name: "Serval",
    message: "Oh, right! I want to put people's impressions of my music on the poster for my next concert"
  },
  {
    name: "Serval",
    message: "Can you contribute a comment or two, Trailblazer?"
  },
  {
    name: "Serval",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Serval",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    name: "Serval",
    message: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    name: "Serval",
    message: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
]

export default function Messages() {

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
      <Center>
        <Chat messages={messages} />
      </Center>
    </Box>
  )
}
