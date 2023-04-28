import { trim } from '@/scripts/util';
import { Button, Center, Container, FormControl, Grid, GridItem, GridItemProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { GroupBase, Select, SingleValue } from "chakra-react-select";
import { find, forEach, map, keys, last, pickBy, omit, includes, filter, orderBy } from 'lodash'
import React, { useEffect } from 'react';
import { useState } from 'react';
import AnswerResponse from './interfaces/AnswerResponse';
import CharacterResponse from './interfaces/CharacterResponse';

enum Correctness {
  Correct = "Correct",
  Partial = "Partial",
  Incorrect = "Incorrect"
}

type Option = {
  label: string,
  value: string
}

type GameProps = {
  characters: CharacterResponse[],
  answer: AnswerResponse,
  totalGuesses?: number
}

export default function Game({ characters, answer, totalGuesses = 5 }: GameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessing, setGuessing] = useState<string>();
  const [isComplete, setIsComplete] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const columns = filter(keys(characters[0]), (k: string) => !includes(["_id", "__v"], k));
  const answerChar = find(characters, char => char._id == answer.answer)!

  useEffect(() => {
    checkGameComplete();
  }, [guesses])

  function generationOptions(guesses: string[]) {
    return map(
      orderBy(
        filter(characters, char => !includes(guesses, char.name)),
        char => char.name, ['asc']
      ),
      (char: CharacterResponse) => ({ label: char.name, value: char.name })
    );
  }

  function handleChange(newValue: SingleValue<Option>) {
    setGuessing(newValue!.value);
  }

  function handleSubmit() {
    if (!includes(guesses, guessing)) {
      setGuesses([...guesses, guessing!]);
    }
  }

  function areNamesEqual(name1: string, name2: string) {
    return trim(name1) === trim(name2)
  }

  function checkGameComplete() {
    console.log(guesses.length, answerChar.name, last(guesses), includes(guesses, answerChar.name))
    if (guesses.length && (guesses.length > 4 || includes(guesses, answerChar.name))) {
      console.log("COMPLETE!")
      setIsComplete(true)
      onOpen()
    }
  }

  function renderGuessResults() {
    if (!guesses.length) return null;

    return <>
      {map(guesses, (guess, i) => {
        const guessChar = find(characters, char => areNamesEqual(char.name, guess))!;

        return <React.Fragment key={`${guessChar._id}-${i}`}>
          {map(columns, (col, j) => {
            const key = col as keyof CharacterResponse;
            let correctness = guessChar[key] === answerChar[key] ? Correctness.Correct : Correctness.Incorrect;

            return <React.Fragment key={`${guessChar._id}-${i}-${j}`}>
              <GuessItem correctness={correctness} content={guessChar[key]} />
            </React.Fragment>
          })}
        </React.Fragment>
      })}
    </>
  }

  function renderResultMessage() {
    if (guesses.length > 4) {
      return "You were unable to guess correctly."
    } else {
      return `You guessed correctly in ${guesses.length} tries.`
    }
  }

  return (<>
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Results</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderResultMessage()}
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Center>
      <Container>
        <FormControl>
          <Select
            name="guess-input"
            onChange={handleChange}
            options={generationOptions(guesses)}
          />
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
            isDisabled={!guessing}
            onClick={handleSubmit}
          />
        </FormControl>

        <Grid templateRows={`repeat(${totalGuesses + 1}, 1fr)`} templateColumns={`repeat(${columns.length}, 1fr)`} gap={1}>
          {map(columns, (col) => (
            <GridItem key={`header-${col}`}>
              {col}
            </GridItem>
          ))}
          {renderGuessResults()}
        </Grid>
      </Container>
    </Center >
  </>
  )
}

type GuessItemProps = {
  correctness: Correctness,
  content: string | number,
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
    <GridItem bg={`${color}.500`}>
      {content}
    </GridItem>
  )
}

