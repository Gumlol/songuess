import React, { useState } from 'react'

export default function Word(props: { text: string, encryptedLyrics?: string, guessText?: string, show?: boolean, isCheckGuess?: any, progressBar?: any, setProgressBar?: any, progressBarMaxWidth?: number, guessedSongs?: string[], setGuessedSongs?: any, dictAllWords?: {}}) {
  const { text, encryptedLyrics, guessText, isCheckGuess, progressBar, setProgressBar, progressBarMaxWidth, guessedSongs, setGuessedSongs, dictAllWords} = props;
  const [show, setShow] = useState(props.show);
  const [isGuessed, setIsGuessed] = useState(false);
  // console.log(text);
  function checkGuess() {
    if (text.toLowerCase() === guessText?.toLowerCase()) {
      if (guessedSongs && text !== '') {
        setGuessedSongs([...guessedSongs, text.toLowerCase()]);
      }
      setIsGuessed(true);
      setShow(true);
      let percentage = 0
      if (progressBarMaxWidth && !(guessedSongs?.includes(text.toLowerCase()))) {
        //@ts-ignore
        let wordCount = dictAllWords[text.toLowerCase()];
        percentage = ((1 * wordCount) / (progressBarMaxWidth)) * 100;
        setProgressBar(progressBar + percentage);
        console.log(percentage);
      }

    }
    
  }
  if (isCheckGuess) {
    setTimeout(() => {
      checkGuess();
    }, 100);
  }

  
  return (
    <span className='playground-lyrics-word' style={{color: show === true ? 'rgb(255, 255, 255)' : 'rgb(18, 18, 18)', display: text.includes('Текст') ? 'none' : 'block'}}>
        {typeof encryptedLyrics === 'undefined' 
          ? text
          : isGuessed 
              ? text
              : encryptedLyrics
        }
    </span>
  )
}