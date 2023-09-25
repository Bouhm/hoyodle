import { Avatar, Box, Center, Container, Flex, Heading, Spinner, VStack } from '@chakra-ui/react'
import styles from '@/styles/Messages.module.css';

export type Message = {
  name: string,
  message: string
}

type ChatProps = {
  messages: Message[]
}

export default function Chat({ messages }: ChatProps) {
  function renderMessages() {
    return (
      <VStack display={'flex'}>
        <Container className={styles.messages}>
          {messages.map(messageContent => {
            const { name, message } = messageContent;

            return (
              <Flex className={styles.messageContainer} key={message}>
                <Avatar
                  className={styles.messageAvatar}
                  src="https://static.wikia.nocookie.net/houkai-star-rail/images/7/7c/Character_Serval_Icon.png"
                  size='lg'
                />
                <Flex flexDirection={'column'} className={styles.messageContent} width={'100%'}>
                  <Heading className={styles.messageName} as="h4" size='md'>
                    {name}
                  </Heading>
                  <Box className={styles.messageBox}>
                    {message}
                  </Box>
                </Flex>
              </Flex>
            )
          })}
        </Container>
        <Container className={styles.playerGuesses}>
        </Container>
      </VStack>
    )
  }

  return (
    <Container className={styles.messagesContainer}>
      <Container className={styles.messageHeader}>
        <Heading>
          Serval
        </Heading>
        <Heading className={styles.messageStatus} size='md' as="h3">
          Lacking sleep and inspiration
        </Heading>
      </Container>
      {renderMessages()}
    </Container>
  )
}
