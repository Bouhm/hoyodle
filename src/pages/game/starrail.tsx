import Game from '@/components/Game'
import { Center, Container } from '@chakra-ui/react'

const characters = [
  { name: "Arlan", rarity: 4, weapon: "The Destruction", element: "Lightning" },
  { name: "Asta", rarity: 4, weapon: "The Harmony", element: "Fire" },
  { name: "Bailu", rarity: 5, weapon: "The Abundance", element: "Lightning" },
  { name: "Blade", rarity: 5, weapon: "The Destruction", element: "Wind" },
  { name: "Bronya", rarity: 5, weapon: "The Harmony", element: "Wind" },
  { name: "Clara", rarity: 5, weapon: "The Destruction", element: "Physical" },
  { name: "Dan Heng", rarity: 4, weapon: "The Hunt", element: "Wind" },
  { name: "Gepard", rarity: 5, weapon: "The Preservation", element: "Ice" },
  { name: "Herta", rarity: 4, weapon: "The Erudition", element: "Ice" },
  { name: "Himeko", rarity: 5, weapon: "The Erudition", element: "Fire" },
  { name: "Hook", rarity: 4, weapon: "The Destruction", element: "Fire" },
  { name: "Jing Yuan", rarity: 5, weapon: "The Erudition", element: "Lightning" },
  { name: "Kafka", rarity: 5, weapon: "The Nihility", element: "Lightning" },
  { name: "Luocha", rarity: 5, weapon: "The Abundance", element: "Imaginary" },
  { name: "March 7th", rarity: 4, weapon: "The Preservation", element: "Ice" },
  { name: "Natasha", rarity: 4, weapon: "The Abundance", element: "Physical" },
  { name: "Pela", rarity: 4, weapon: "The Nihility", element: "Ice" },
  { name: "Qingque", rarity: 4, weapon: "The Erudition", element: "Quantum" },
  { name: "Sampo", rarity: 4, weapon: "The Nihility", element: "Wind" },
  { name: "Seele", rarity: 5, weapon: "The Hunt", element: "Quantum" },
  { name: "Serval", rarity: 4, weapon: "The Erudition", element: "Lightning" },
  { name: "Silver Wolf", rarity: 5, weapon: "The Nihility", element: "Quantum" },
  { name: "Sushang", rarity: 4, weapon: "The Hunt", element: "Physical" },
  { name: "Tingyun", rarity: 4, weapon: "The Harmony", element: "Lightning" },
  { name: "Welt", rarity: 5, weapon: "The Nihility", element: "Imaginary" },
  { name: "Yanqing", rarity: 5, weapon: "The Hunt", element: "Ice" },
]

const data = {
  characters: ["Arlan", "Asta", "Bailu", "Blade", "Bronya", "Clara", "Dan Heng", "Gepard", "Herta", "Himeko", "Hook", "Jing Yuan", "Kafka", "Luocha", "March 7th", "Natasha", "Pela", "Qingque", "Sampo", "Seele", "Serval", "Silver Wolf", "Sushang", "Tingyun", "Welt", "Yanqing"],
  paths: ["The Destruction", "The Hunt", "The Erudition", "The Harmony", "The Nihility", "The Preservation", "The Abundance"],
  elements: ["Physical", "Fire", "Ice", "Lightning", "Wind", "Quantum", "Imaginary"],
  sex: ["Male", "Female"]
}

const columns = [
  "Name",
  "Element",
  "Path",
  "Rarity"
]

export default function StarRail() {
  return (
    <Center>
      <Container>
        <Game characters={characters} answer={characters[5].name} />
      </Container>
    </Center>
  )
}
