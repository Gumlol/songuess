import React, { useState } from 'react'
import Word from './Word'

export default function WordWrapper(props: {lyricsRow: any, guessText: string, isCheckGuess: any, progressBar: any, setProgressBar: any, progressBarMaxWidth: number, guessedSongs: string[], setGuessedSongs: any, dictAllWords: {}}) {
  let lyrics = props.lyricsRow;
  const {guessText, isCheckGuess, progressBar,  setProgressBar, progressBarMaxWidth, guessedSongs, setGuessedSongs, dictAllWords} = props;
  let encryptedLyrics : string[] = [];
  let allLyrics;

  if (Array.isArray(lyrics)) {
    encryptedLyrics = lyrics.map((item: string) => {
      let encryptedItem = '';
      for (let i = 0; i < item.length; i++) {
        encryptedItem += '*'
      }
      return encryptedItem;
    })
  }
  if (Array.isArray(lyrics)) {
    allLyrics = lyrics.map((item, index) => [item, encryptedLyrics[index]]);
  }

  return (
    <div className='playground-lyrics-word-wrapper-row'>
        {
          typeof lyrics === 'string' 
          ? <Word text={lyrics} show={true}/>
          : allLyrics?.map(([lyrics, encryptedLyrics], index) => (
            <Word key={index} text={lyrics} encryptedLyrics={encryptedLyrics} guessText={guessText} isCheckGuess={isCheckGuess} progressBar={progressBar} setProgressBar={setProgressBar} progressBarMaxWidth={progressBarMaxWidth} guessedSongs={guessedSongs} setGuessedSongs={setGuessedSongs} dictAllWords={dictAllWords}/>
          ))
        }
    </div>
  )
}
