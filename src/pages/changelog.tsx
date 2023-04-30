import { Container, Divider, Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";

export default function Changelog() {
  return (
    <Container maxW="container.lg" color="white" paddingTop="2rem">
      <Heading size='2xl' marginBottom="2rem">Changes</Heading>
      <Stack spacing={3}>
        <Heading >
          v0.2.0
        </Heading>
        <UnorderedList>
          <ListItem>Update landing page</ListItem>
          <ListItem>Remove M/F hint to increase difficulty</ListItem>
        </UnorderedList>
        <Divider />
        <Heading>
          v0.1.2
        </Heading>
        <UnorderedList>
          <ListItem>Adjust padding for smaller screen sizes</ListItem>
          <ListItem>Use background images</ListItem>
          <ListItem>Add tooltips for mobile</ListItem>
        </UnorderedList>
        <Heading>
          v0.1.1
        </Heading>
        <UnorderedList>
          <ListItem>Optimize image assets</ListItem>
          <ListItem>Deploy on registered domain</ListItem>
          <ListItem>Adjust image resizing on mobile screen width</ListItem>
        </UnorderedList>
        <Heading >
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
