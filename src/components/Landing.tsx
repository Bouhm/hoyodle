import { Heading, Box, AbsoluteCenter, Text, Container, Link, Center, VStack, HStack } from "@chakra-ui/react"
import Image from "next/image"
import Footer from "./Footer"

export default function Landing() {
  return (
    <Box paddingTop="2rem">
      <Container>
        <Center color="white" marginBottom={'3rem'}>
          <HStack>
            <Heading letterSpacing={'-3px'} style={{ marginRight: '-0.3rem' }} fontSize={60}>HOY</Heading>
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="Pom Pom"
              style={{ marginTop: '0.3rem' }}
            />
            <Heading letterSpacing={'-2px'} fontSize={60} style={{ marginLeft: '0.1rem', marginTop: '-0.15rem' }}>DLE</Heading>
          </HStack>
        </Center>
      </Container>
      <Container>
        <Center color="gray">
          <VStack>
            <Container centerContent>
              <Link href="/game/honkaistarrail">
                <Image
                  src="/images/hsr/pompom.webp"
                  className="glow-on-hover"
                  width={200}
                  height={200}
                  alt="Pom Pom"
                />
              </Link>
              <Text color="white">Play Honkai: Star Rail Challenge</Text>
            </Container>
            <Text textAlign="center">
              More modes and features in development. Stay tuned!
            </Text>
          </VStack>
        </Center>
      </Container>
      <Footer />
    </Box >
  )

}
