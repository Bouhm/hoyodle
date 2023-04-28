import { trim } from '@/scripts/util';
import { Center, Container, Grid, GridItem, GridItemProps } from '@chakra-ui/react'
import { GroupBase, Select, SingleValue } from "chakra-react-select";
import { find, forEach, map, keys, last } from 'lodash'
import { useState } from 'react';

enum Correctness {
  Correct = "Correct",
  Partial = "Partial",
  Incorrect = "Incorrect"
}

type Option = {
  label: string,
  value: string
}

type CharacterData = {
  name: string,
  weapon: string,
  element: string,
  rarity: number
}

type GameProps = {
  characters: CharacterData[],
  answer: string,
  totalGuesses?: number
}

export default function Game({ characters, answer, totalGuesses = 5 }: GameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const columns = keys(characters[0]);

  function generationOptions() {
    return map(characters, (char: CharacterData) => ({ label: char.name, value: char.name }));
  }

  function handleGuess(newValue: SingleValue<Option>) {
    setGuesses([...guesses, newValue!.value]);
  }

  function renderGuessResults() {
    if (!guesses.length) return null;

    return <>
      {map(guesses, guess => {
        const guessChar = find(characters, char => trim(char.name) === trim(guess))!;
        const answerChar = find(characters, char => trim(char.name) === trim(answer))!;

        return <>
          {map(columns, col => {
            const key = col as keyof CharacterData;
            let correctness = guessChar[key] === answerChar[key] ? Correctness.Correct : Correctness.Incorrect;

            return <GuessItem correctness={correctness} content={guessChar[key]} />
          })}
        </>
      })}
      {map(Array(totalGuesses - guesses.length), _ =>
        <GridItem />
      )}
    </>
  }

  return (
    <Center>
      <Container>
        <Select
          name="guess-input"
          onChange={handleGuess}
          options={generationOptions()}
        />
        <Grid templateRows={`repeat(${totalGuesses + 1}, 1fr)`} templateColumns={`repeat(${columns.length}, 1fr)`} gap={3}>
          {map(columns, col => (
            <GridItem>
              {col}
            </GridItem>
          ))}
          {renderGuessResults()}
        </Grid>
      </Container>
    </Center >
  )
}

type GuessItemProps = {
  correctness: Correctness,
  content: string | number
}

function GuessItem({ correctness, content }: GuessItemProps) {
  let color = "green";

  switch (correctness) {
    case Correctness.Correct:
      color = "green";
      break;
    case Correctness.Partial:
      color = "yellow";
      break;
    case Correctness.Incorrect:
      color = "red";
      break;
  }

  return (
    <GridItem bg={color}>
      {content}
    </GridItem>
  )
}

