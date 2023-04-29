import { Container, Divider, Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";

export default function Changelog() {
  return (
    <Container maxW="container.lg" color="white">
      <Heading as='h1' size='2xl' marginBottom="2rem">Changelog</Heading>
      <Stack spacing={3}>
        <Heading as='h1'>
          v0.1.1
        </Heading>
        <UnorderedList>
          <ListItem>Optimize image assets</ListItem>
          <ListItem>Deploy on registered domain</ListItem>
        </UnorderedList>
        <Divider />
        <Heading as='h1'>
          v0.1.0
        </Heading>
        <UnorderedList>
          <ListItem>Implement classic mode</ListItem>
          <ListItem>Deploy server & automate daily game</ListItem>
        </UnorderedList>
      </Stack>
    </Container>
  )

}
