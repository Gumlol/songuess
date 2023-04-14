import React, { useEffect, useState } from 'react'
import WordWrapper from './WordWrapper'
import Guesser from './Guesser';
import ProgressBar from './ProgressBar';
import ModalWin from './ModalWin';

export default function PlayGround(props: { data: any, setIsStarted: any, isStarted: boolean}) {
  const { data, setIsStarted, isStarted } = props;
  const [lyrics, setLyrics] = useState<[] | undefined>(undefined);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [guessText, setGuessText] = useState('');
  const [isCheckGuess, setIsCheckGuess] = useState(false);
  const [isCheckGuessSong, setIsCheckGuessSong] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [progressBarMaxWidth, setProgressBarMaxWidth] = useState(0);
  const [guessedSongs, setGuessedSongs] = useState<string[]>(['']);
  
  useEffect(() => {
    if (data) {
      setLyrics(data.data.lyrics);
      setAuthor(data.data.author);
      setTitle(data.data.title);
      setImage(data.data.image);
      setUrl(data.data.url);
      if (data.data.lyrics) {
        setIsStarted(true);
        let width = 0;
        data.data.lyrics.forEach((lyricsRow: any) => {
          if (Array.isArray(lyricsRow)) {
            width += lyricsRow.length;
          }
        });
        setProgressBarMaxWidth(width);
      } else {
        alert('Введите имя исполнителя');
      }
      
    }
  }, [data]);

  const dictAllWords: {[key: string]: number} = {};

  if (lyrics) {
    for (let i = 0; i < lyrics.length; i++) {
      let element: string[] = lyrics[i];
      if (Array.isArray(element)) {
        for (let j = 0; j < element.length; j++) {
          let word = element[j].toLowerCase();
          if (dictAllWords[word]) {
            dictAllWords[word]++;
          } else {
            dictAllWords[word] = 1;
          }
        }
      } 
    }
  }

  return (
    <div className='playground'>
      {isCheckGuessSong === false ? (
        isStarted ? <Guesser setGuessText={setGuessText} guessText={guessText} setIsCheckGuess={setIsCheckGuess} title={title} setIsCheckGuessSong={setIsCheckGuessSong} /> : ''
      ) : (
        ''
      )
      }
      {isStarted ? <ProgressBar width={progressBar} /> : ''}
      {isCheckGuessSong === false ? (
        <div className="playground-lyrics">
        {isStarted ? (
          lyrics?.map((item, index) => {
            return <WordWrapper key={index} lyricsRow={item} guessText={guessText} isCheckGuess={isCheckGuess} progressBar={progressBar} setProgressBar={setProgressBar} progressBarMaxWidth={progressBarMaxWidth} guessedSongs={guessedSongs} setGuessedSongs={setGuessedSongs} dictAllWords={dictAllWords}/>
          })
        ) : (
          <p className='playground-start-game'></p>
        )}
        </div>
        ) : (
          <ModalWin image={image} author={author} title={title} url={url} />
        )
      }
    </div>
  );
}
