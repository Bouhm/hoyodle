import { Button, Center, Container, Divider, Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";

export default function About() {
  return (
    <Stack spacing={3}>
      <Heading as='h1'>
        About Hoyodle
      </Heading>
      <p>
        Hoyodle is a hobby project made by Bouhm who also made Genshin Impact stats site <a href="https://mondstats.pages.dev" target="_blank">Mondstats</a> which is no longer maintained.
        Hoyodle is a "dle" game (derivative of Wordle) in which players try to guess the character with provided clues.

        You can find me in Discord under Bouhm#2205. I'd love to hear your feedback, suggestions, and/or criticisms!
      </p>
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
  )

}
