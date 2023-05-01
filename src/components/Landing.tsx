import { Heading, Box, AbsoluteCenter, Text, Container, Link, Center, VStack, HStack } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import Footer from "./Footer"

export default function Landing() {
  const [nowDate, setNowDate] = useState<Date>();
  const [resetDate, setResetDate] = useState<Date>();

  useEffect(() => {
    const now = new Date();
    const nowUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
      now.getUTCDate(), now.getUTCHours(),
      now.getUTCMinutes(), now.getUTCSeconds()));

    let nextResetUtc = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        9,
        0,
        0
      )
    );

    if (nowUtc >= nextResetUtc) {
      nextResetUtc.setDate(nextResetUtc.getDate() + 1)
    }

    setNowDate(nowUtc)
    setResetDate(nextResetUtc)
  }, [])

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
            <Container>
              {resetDate &&
                <Countdown nowDate={nowDate!} targetDate={resetDate} label={"NEW GAME IN"} />
              }
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