"use strict";
let wordToBeGuessed = "Apple";

module.exports = {
  setWordToBeGuessed: function (word) {
    wordToBeGuessed = word;
  },

  isLetterPositionCorrect: function (i, letter) {
    return wordToBeGuessed[i] === letter;
  },

  isLetterInCorrectWord: function (letter) {
    return wordToBeGuessed.includes(letter);
  },

  getWordToBeGuessed: function () {
    return wordToBeGuessed;
  },

  isGuessedWordCorrect: function (guess) {
    let IndexesOfLettersInCorrectWordAtCorrectPosition = [];
    let IndexesOfLettersInCorrectWord = [];

    for (let i = 0; i < wordToBeGuessed.length; i++) {
      IndexesOfLettersInCorrectWordAtCorrectPosition.push(
        this.isLetterPositionCorrect(guess[i])
      );
      IndexesOfLettersInCorrectWord.push(this.isLetterInCorrectWord(guess[i]));
    }

    return [
      IndexesOfLettersInCorrectWordAtCorrectPosition,
      IndexesOfLettersInCorrectWord,
    ];
  },
};
