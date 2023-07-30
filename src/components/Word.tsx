import React, { useState } from 'react'

export default function Word(props: { text: string, encryptedLyrics?: string, guessText?: string, show?: boolean, isCheckGuess?: any, progressBar?: any, setProgressBar?: any, progressBarMaxWidth?: number, guessedWords?: string[], setGuessedWords?: any, dictAllWords?: {}, isEasier?: any, guessedWordsEasier?: any}) {
  const { text, encryptedLyrics, guessText, isCheckGuess, progressBar, setProgressBar, progressBarMaxWidth, guessedWords, setGuessedWords, dictAllWords, isEasier, guessedWordsEasier} = props;
  const [show, setShow] = useState(props.show);
  const [isGuessed, setIsGuessed] = useState(false);

  async function checkGuess() {
    if (text.toLowerCase() === guessText?.toLowerCase()) {
      let percentage = 0;
      if (progressBarMaxWidth && !(guessedWords?.includes(text.toLowerCase()))) {
        // @ts-ignore
        let wordCount = dictAllWords[text.toLowerCase()];
        percentage = ((1 * wordCount) / (progressBarMaxWidth)) * 100;
        setProgressBar(progressBar + percentage);
      }
      if (guessedWords && text !== '' && !(guessedWords?.includes(text.toLowerCase()))) {
        guessedWords.push(text.toLowerCase());
      }
      setIsGuessed(true);
      setShow(true);
      
    }
    
  }

  async function checkGuessEasier() {
    if (text.length < 3) {
      if (guessedWordsEasier && text !== '' && !(guessedWordsEasier?.includes(text.toLowerCase()))) {
        guessedWordsEasier.push(text.toLowerCase());
      }
      setIsGuessed(true);
      setShow(true);
    }
  }
  

  if (isCheckGuess) {
    setTimeout(() => {
      checkGuess();
    }, 100);
  }

  if (isEasier) {
    setTimeout(() => {
      checkGuessEasier();
    }, 100);
  }


  return (
    <span className='playground-lyrics-word' style={{color: show === true ? 'rgb(255, 255, 255)' : 'rgb(18, 18, 18)', display: text.includes('Текст') ? 'none' : 'block'}}>
        {typeof encryptedLyrics === 'undefined' 
          ? (text)
          : (isGuessed)
              ? (text)
              : (encryptedLyrics)
        }
    </span>
  )
}