import React, { useState } from 'react';

export default function Guesser(props: {guessText: string, setGuessText: any, setIsCheckGuess: any, title: string, setIsCheckGuessSong: any, setIsEasier: any, setIsConcide: any, setIsEasierProgress: any}) {
    let { guessText, setGuessText, setIsCheckGuess, title, setIsCheckGuessSong, setIsEasier, setIsConcide, setIsEasierProgress} = props;
    const [guessSongText, setGuessSongText] = useState('');
    const [countTries, setCountTries] = useState(0);
    const [isEasierShow, setIsEasierShow] = useState(true);

    if (title) {
        title = title.replace('’', "'");
        title = title.replace('«', "");
        title = title.replace('»', "");
        title = title.replace('”', "");
        title = title.replace('”', "");
    }

    async function handleGuessKeyDown(e : React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            setIsCheckGuess(true);
            setCountTries(countTries + 1);
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
            setCountTries(countTries + 1);
            if (title.toLowerCase().slice(0, title.indexOf('(')).trim() === guessSongText.toLowerCase() || title.toLowerCase().slice(title.indexOf('(') + 1, title.indexOf(')')).trim() === guessSongText.toLowerCase() || title.toLowerCase() === guessSongText.toLowerCase()) {
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

    async function handleGuessForMobile(e : any) {
        setIsCheckGuess(true);
        setCountTries(countTries + 1);
        setTimeout(() => {
            setGuessText('');
            setIsCheckGuess(false);
        }, 100);
    }

    async function handleGuessSongForMobile(e : any) {
        setCountTries(countTries + 1);
        if (title.toLowerCase().slice(0, title.indexOf('(')).trim() === guessSongText.toLowerCase() || title.toLowerCase().slice(title.indexOf('(') + 1, title.indexOf(')')).trim() === guessSongText.toLowerCase()) {
            setIsCheckGuessSong(true);
        }
        setTimeout(() => {
            setGuessSongText('');
        }, 100);
    }

    async function handleClickSetIsEasier() {
        setIsEasier(true);
        setIsEasierShow(false);
        setTimeout(() => {
            setIsEasier(false);
            setTimeout(() => {
                setIsEasierProgress(true);
            }, 100);
            
        }, 100);
    }

    async function handleClickSetIsConcide() {
        setIsConcide(true);
        setIsCheckGuessSong(true);
    }
    
  return (
    <div className='playground-guesser'>
        <input type="text" name="" id="" className='playground-guesser-input' placeholder='Введите слово' value={guessText} onKeyDown={handleGuessKeyDown} onChange={e => {handleChangeText(e)}}/>
        <button className='playground-guesser-input-button' onClick={handleGuessForMobile}>➡</button>
        <br />
        <br />
        <input type="text" name="" id="" className='playground-guesser-input playground-guesser-input-song' placeholder='Угадайте песню' value={guessSongText} onKeyDown={handleGuessSongKeyDown} onChange={e => {handleChangeGuessSong(e)}}/>
        <button className='playground-guesser-input-button' onClick={handleGuessSongForMobile}>➡</button>
        <br />
        <button className='playground-guesser-button-easier' onClick={handleClickSetIsEasier} style={{display: isEasierShow ? 'inline' : 'none'}}>Упростить</button>
        <br style={{display: isEasierShow ? 'inline' : 'none'}} />
        <button className='playground-guesser-button-concide' style={{display: countTries >= 25 ? 'inline' : 'none'}} onClick={handleClickSetIsConcide}>Сдаться</button>
    </div>
  )
}
