import { trim } from '@/scripts/util';
import { Button, Container, Grid, GridItem, Heading, Hide, Highlight, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Popover, PopoverBody, PopoverContent, PopoverTrigger, Square, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { Select, SingleValue } from "chakra-react-select";
import { find, map, keys, includes, filter, orderBy, first, capitalize } from 'lodash'
import React, { useEffect, useRef } from 'react';
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

export default function Game({ characters, answer, totalGuesses = 6 }: GameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessing, setGuessing] = useState<string>();
  const [isComplete, setIsComplete] = useState(false);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const columns = filter(keys(characters[0]), (k: string) => !includes(["_id", "__v", "name", "sex"], k));
  const answerChar = find(characters, char => char._id == answer.answer)!
  const initialRender = useRef(true);

  // Get cached data
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let lastGameId = localStorage.getItem('lastGameId');
      let storedGuesses = JSON.parse(localStorage.getItem('guesses')!) as string[];
      let hasCompleted = JSON.parse(localStorage.getItem('hasCompleted')!) as boolean;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (lastGameId === answer._id && Array.isArray(storedGuesses)) {
        setGuesses(storedGuesses);
        setIsComplete(hasCompleted);
      }
    }
  }, []);

  // Check for game completion
  useEffect(() => {
    if (guesses.length && (guesses.length >= totalGuesses || includes(guesses, answerChar.name))) {
      if (initialRender.current) {
        initialRender.current = false;
        return;
      }
      setIsComplete(true)
      setGuessedCorrectly(includes(guesses, answerChar.name))
      onModalOpen()
    }
  }, [guesses, answerChar.name, onModalOpen])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    localStorage.setItem('lastGameId', answer._id)
    localStorage.setItem('guesses', JSON.stringify(guesses))
  }, [guesses])

  useEffect(() => {
    localStorage.setItem('hasCompleted', JSON.stringify(isComplete))
  }, [isComplete])

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

  function renderGuessItem(key: string, content: string) {
    switch (key) {
      case "rarity":
        return <Text display="flex" alignItems="center">
          {content}{' '}<StarIcon fontSize={11} />
        </Text>
      case "weapon":
      case "element":
        return <Container
          display="flex"
          flexFlow="row"
          alignItems="center"
          justifyContent="center"
        >
          <Popover>
            <PopoverTrigger>
              <Image
                className={key === "element" ? "image-shadow" : ""}
                src={`/images/hsr/${key}s/${trim(content as string)}.webp`}
                width="40" height="40"
                alt={content as string}
                style={{ margin: "0 0.5rem" }}
              />
            </PopoverTrigger>
            <PopoverContent maxWidth={"7rem"}>
              <PopoverBody>{content}</PopoverBody>
            </PopoverContent>
          </Popover>
          <Hide breakpoint='(max-width: 768px)'><Text padding={1} minWidth="5.5rem">{content}</Text></Hide>
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
    if (!guessedCorrectly) {
      return <>
        <Text textAlign="center">Today's guess was</Text>
        <Heading textAlign="center" size="md">{answerChar.name}</Heading>
        <Image src={`/images/hsr/characters/${trim(answerChar.name)}_splash.webp`} width="512" height="512" alt={answerChar.name} />
        <Text textAlign="center" style={{ marginTop: '1rem' }}>{"You were unable to guess correctly."}</Text >
      </>
    } else {
      return <>
        <Image src={`/images/hsr/characters/${trim(answerChar.name)}_splash.webp`} width="512" height="512" alt={answerChar.name} />
        <Text textAlign="center" style={{ marginTop: '1rem' }}>
          <Highlight query={guesses.length.toString()} styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}>
            {`You guessed correctly in  ${guesses.length.toString()}  ${guesses.length === 1 ? "try! 💯" : " tries!"}`}
          </Highlight>
        </Text >
      </>
    }
  }

  return (<>
    <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered motionPreset='scale'>
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
      <Stack direction='row' w="100%" justifyContent={'center'} marginBottom="1rem">
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
          isDisabled={!guessing || isComplete}
          onClick={handleSubmit}
        ><ArrowForwardIcon /></Button>
      </Stack>
      {guesses.length ?
        <>
          <Grid templateRows={`repeat(${totalGuesses}, 1fr)`} templateColumns={`repeat(${columns.length}, 1fr)`} gap={1} color="white">
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
        <Text color="white" marginTop="2rem">
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
    <GridItem
      bg={correctness ? `${color}.600` : ""}
    >
      <Square
        display="flex"
        alignItems="center"
        fontSize="sm"
        fontWeight={600}
        lineHeight="1rem"
        textAlign="center"
        style={{ height: '100%' }}
        padding={[0, 0, 1, 1, 1]}
        border="1px solid rgba(255,255,255,0.4)"
        centerContent
      >
        {children}
      </Square>
    </GridItem >
  )
}

