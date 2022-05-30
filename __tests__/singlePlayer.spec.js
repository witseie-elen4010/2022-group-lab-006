/* eslint-env jest */

"use strict";

const singlePlayer = require("../SRC/singlePlayerTestFunctions");

describe("Set Correct Word Function", () => {
  test("The word to be guessed should be set correctly", () => {
    singlePlayer.setWordToBeGuessed("PLANE");
    const input = "PLANE";
    const output = singlePlayer.getWordToBeGuessed();

    expect(input).toEqual(output);
  });
});

describe("Compare Guessed Word and Correct Word Function", () => {
  test("Indexes of guessed word letters are returned true if the guessed word is correct ", () => {
    singlePlayer.setWordToBeGuessed("PLANE");
    const guessedWord = "PLANE";
    let indexes = [true, true, true, true, true];
    const guessedWordIndexes = singlePlayer.isGuessedWordCorrect(guessedWord);
    expect(guessedWordIndexes[0]).toEqual(indexes);
  });

  test("Indexes of guessed word letters are returned true if they are included in the correct word and false if they are not", () => {
    singlePlayer.setWordToBeGuessed("PLANE");
    const guessedWord = "ADULT";
    let indexes = [true, false, false, true, false];
    const guessedWordLetterIndexes =
      singlePlayer.isGuessedWordCorrect(guessedWord);
    expect(guessedWordLetterIndexes[1]).toEqual(indexes);
  });

  test("Indexes of  guessed word letters are returned true if they are included in the correct word and at correct position", () => {
    singlePlayer.setWordToBeGuessed("PLANE");
    const guessedWord = "PLATE";
    let indexes = [true, true, true, false, true];
    const guessedWordLetterIndexes =
      singlePlayer.isGuessedWordCorrect(guessedWord);
    console.log(guessedWordLetterIndexes[1]);
    expect(guessedWordLetterIndexes[1]).toEqual(indexes);
  });
});
