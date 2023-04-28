import { Container, Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";

export default function Changelog() {
  return (
    <Stack spacing={3}>
      <Heading as='h1'>
        v0.1.0
      </Heading>
      <UnorderedList>
        <ListItem>Implement classic mode</ListItem>
        <ListItem>Deploy server & automate daily game</ListItem>
      </UnorderedList>
    </Stack>
  )

}
