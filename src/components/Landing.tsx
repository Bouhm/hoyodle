import { Heading, Box, AbsoluteCenter } from "@chakra-ui/react"
import Footer from "./Footer"

export default function Landing() {
  return (
    <Box>
      <AbsoluteCenter>
        <Heading textAlign="center" color="gray">
          More exciting game modes and features in development. Stay tuned!
        </Heading>
      </AbsoluteCenter>
      <Footer />
    </Box>
  )

}
