import { trim } from '@/scripts/util';
import { AbsoluteCenter, Box, Button, Center, Container, Divider, FormControl, Grid, GridItem, GridItemProps, Heading, Hide, Highlight, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Square, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { GroupBase, Select, SingleValue } from "chakra-react-select";
import { find, forEach, map, keys, last, pickBy, omit, includes, filter, orderBy, first, capitalize } from 'lodash'
import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image'
import AnswerResponse from './interfaces/AnswerResponse';
import CharacterResponse from './interfaces/CharacterResponse';
import { ArrowForwardIcon, StarIcon } from '@chakra-ui/icons';

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
  const columns = filter(keys(characters[0]), (k: string) => !includes(["_id", "__v", "name"], k));
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
      setIsComplete(true)
      onOpen()
    }
  }

  function renderGuessItem(key: string, content: string) {
    switch (key) {
      case "rarity":
        return <Text display="flex" alignItems="center">
          {content}&nbsp;<StarIcon fontSize={11} />
        </Text>
      case "weapon":
      case "element":
        return <Container display="flex" flexFlow="row" alignItems="center" justifyContent="center">
          <Image
            className={key === "element" ? "image-glow" : ""}
            src={`/images/hsr/${key}s/${trim(content as string)}.webp`}
            width="40" height="40"
            alt={content as string}
            style={{ margin: "0 0.5rem" }}
          />
          <Hide breakpoint='(max-width: 800px)'><Text padding={1} minWidth="5.5rem">{content}</Text></Hide>
        </Container>
      case "sex":
        return <Text>{first(content as string)?.toUpperCase()}</Text>
      case "faction":
      case "default":
        return <Text whiteSpace="pre-wrap">{content}</Text>
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
              <GuessItem correctness={correctness}>
                {renderGuessItem(col, guessChar[key].toString())}
              </GuessItem>
            </React.Fragment>
          })}
        </React.Fragment>
      })}
    </>
  }

  function renderResultMessage() {
    if (guesses.length > 4) {
      return <>
        <Text textAlign="center">Today's guess was</Text>
        <Heading textAlign="center" size="md">{answerChar.name}</Heading>
        <Image src={`/images/hsr/characters/${trim(answerChar.name)}_splash.webp`} width="512" height="512" alt={answerChar.name} />
        <Text textAlign="center">{"You were unable to guess correctly."}</Text >
      </>
    } else {
      return <>
        <Image src={`/images/hsr/characters/${trim(answerChar.name)}_splash.webp`} width="512" height="512" alt={answerChar.name} />
        <Text textAlign="center">
          {"You guessed correctly in "}
          <Highlight query='spotlight' styles={{ bg: 'teal.100' }}>{guesses.length.toString()}</Highlight>
          {guesses.length === 1 ? " try! 💯" : " tries!"}
        </Text >
      </>
    }
  }

  return (<>
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent color="white">
        <ModalCloseButton />
        <ModalBody marginTop="1rem">
          {renderResultMessage()}
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Container maxW="container.sm" centerContent>
      <Stack direction='row' w="100%" justifyContent={'center'}>
        <Select
          useBasicStyles
          placeholder="Select a character..."
          classNamePrefix="rselect"
          name="guess-input"
          selectedOptionColorScheme="purple"
          onChange={handleChange}
          options={generationOptions(guesses)}
        />
        <Button
          mt={4}
          colorScheme='purple'
          type='submit'
          isDisabled={!guessing}
          onClick={handleSubmit}
        ><ArrowForwardIcon /></Button>
      </Stack>
      {guesses.length ?
        <>
          <Grid templateRows={`repeat(${totalGuesses + 1}, 1fr)`} templateColumns={`repeat(${columns.length}, 1fr)`} gap={1} color="white">
            {map(columns, (col) => {
              let header = col;
              if (header === "weapon") header = "path"

              return (
                <React.Fragment key={`header${col}`}>
                  <Text display="flex" alignItems="flex-end" justifyContent="center">{capitalize(header)}</Text>
                </React.Fragment>
              )
            })}
            {renderGuessResults()}
          </Grid>
        </>
        :
        <Text>
          Start the game by making a guess.
        </Text>
      }
    </Container>
  </>
  )
}

type GuessItemProps = {
  correctness?: Correctness,
  children?: React.ReactNode,
}

function GuessItem({ correctness, children }: GuessItemProps) {
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
    <GridItem bg={correctness ? `${color}.500` : ""}>
      <Square
        display="flex"
        alignItems="center"
        fontSize="sm"
        fontWeight={600}
        lineHeight="1rem"
        padding={1}
        textAlign="center"
        style={{ height: '100%' }}
        centerContent
      >
        {children}
      </Square>
    </GridItem >
  )
}

