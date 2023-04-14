import React, { useState } from 'react';

export default function Guesser(props: {guessText: string, setGuessText: any, setIsCheckGuess: any, title: string, setIsCheckGuessSong: any}) {
    let { guessText, setGuessText, setIsCheckGuess, title, setIsCheckGuessSong} = props;
    const [guessSongText, setGuessSongText] = useState('');

    async function handleGuessKeyDown(e : React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            setIsCheckGuess(true);
            setTimeout(() => {
                setGuessText('');
                setIsCheckGuess(false);
            }, 100);
        }
    }

    function handleChangeText(e : React.ChangeEvent<HTMLInputElement>) {
        setGuessText(e.target.value.trim());
    }

    async function handleGuessSongKeyDown(e : React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            console.log(title)
            if (title.toLowerCase().slice(0, title.indexOf('(')).trim() === guessSongText.toLowerCase() || title.toLowerCase().slice(title.indexOf('(') + 1, title.indexOf(')')).trim() === guessSongText.toLowerCase()) {
                setIsCheckGuessSong(true);
            }
            setTimeout(() => {
                setGuessSongText('');
            }, 100);
        }
    }

    function handleChangeGuessSong(e : React.ChangeEvent<HTMLInputElement>) {
        setGuessSongText(e.target.value);
    }
    

  return (
    <div className='playground-guesser'>
        <input type="text" name="" id="" className='playground-guesser-input' placeholder='Введите слово' value={guessText} onKeyDown={handleGuessKeyDown} onChange={e => {handleChangeText(e)}}/>
        <br />
        <br />
        <input type="text" name="" id="" className='playground-guesser-input playground-guesser-input-song' placeholder='Угадайте песню' value={guessSongText} onKeyDown={handleGuessSongKeyDown} onChange={e => {handleChangeGuessSong(e)}}/>
    </div>
  )
}
