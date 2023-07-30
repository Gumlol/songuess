import React, { useEffect, useMemo, useState } from 'react'
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
  // const [guessedWords, setGuessedWords] = useState<string[]>(['']);
  const [isEasier, setIsEasier] = useState(false);
  const [isConcide, setIsConcide] = useState(false);
  const [isEasierProgress, setIsEasierProgress] = useState(false);

  let progressBarEasier = 0;
  const guessedWords = useMemo(() => [''], []);
  const guessedWordsEasier = useMemo(() => [], []);
  
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

  if (isEasierProgress) {
    for (let i = 0; i < guessedWordsEasier.length; i++) {
      let percentage = 0;
      let word = guessedWordsEasier[i];
      if (Object.keys(dictAllWords).includes(word) && !(guessedWords?.includes(word))) {
        let wordCount = dictAllWords[word];
        percentage = ((1 * wordCount) / (progressBarMaxWidth)) * 100;
        progressBarEasier += percentage;
      }
    }
    guessedWords.push(...guessedWordsEasier);
    setProgressBar(progressBar + progressBarEasier);
    setIsEasierProgress(false);
  }

  return (
    <div className='playground'>
      {isCheckGuessSong === false ? (
        isStarted ? <Guesser setGuessText={setGuessText} guessText={guessText} setIsCheckGuess={setIsCheckGuess} title={title} setIsCheckGuessSong={setIsCheckGuessSong} setIsEasier={setIsEasier} setIsConcide={setIsConcide} setIsEasierProgress={setIsEasierProgress} /> : ''
      ) : (
        ''
      )
      }
      {isStarted ? <ProgressBar width={progressBar} /> : ''}
      {isCheckGuessSong === false ? (
        <div className="playground-lyrics">
        {isStarted ? (
          lyrics?.map((item, index) => {
            return <WordWrapper key={index} lyricsRow={item} guessText={guessText} isCheckGuess={isCheckGuess} progressBar={progressBar} setProgressBar={setProgressBar} progressBarMaxWidth={progressBarMaxWidth} guessedWords={guessedWords}  dictAllWords={dictAllWords} isEasier={isEasier} guessedWordsEasier={guessedWordsEasier}/>
            // setGuessedWords={setGuessedWords} 
            
          })
        ) : (
          <p className='playground-start-game'></p>
        )}
        </div>
        ) : (
          <ModalWin image={image} author={author} title={title} url={url} isConcide={isConcide} />
        )
      }
    </div>
  );
}
