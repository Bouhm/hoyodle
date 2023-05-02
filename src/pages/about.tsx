import { Container, Divider, Heading, ListItem, Stack, UnorderedList, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function About() {
  return (
    <Container maxW="container.lg" color="white" paddingTop="2rem">
      <Head>
        <title>Hoyodle - About</title>
      </Head>
      <Heading as='h1' size='2xl' marginBottom="2rem">About Hoyodle</Heading>
      <Stack spacing={3}>
        <Text>
          Hoyodle is a hobby project made by Bouhm who also made Genshin Impact stats site https://mondstats.pages.dev which is no longer maintained.
          Hoyodle is a "dle" game (derivative of Wordle) in which players try to guess the character with provided clues.
        </Text>
        <Text>
          You can find me in Discord under Bouhm#2205. I'd love to hear your feedback, suggestions, and/or criticisms!
        </Text>
        <Divider />
        <Heading as='h1'>
          Planned Features
        </Heading>
        <UnorderedList>
          <ListItem>Character quotes mode</ListItem>
          <ListItem>Show stats for solving today's puzzle across all players</ListItem>
          <ListItem>Allow playing of previous day's puzzle</ListItem>
          <ListItem>Genshin Impact version</ListItem>
        </UnorderedList>
      </Stack>
    </Container>
  )

}
