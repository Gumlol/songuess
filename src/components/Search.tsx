import React, { useState } from 'react';
import axios from 'axios'

export default function Search(props: any) {
    const [perPage, setPerPage] = useState(50);
    const [sort, setSort] = useState('popularity');
    const [text, setText] = useState('');
    const [disabled, setDisabled] = useState(false);

    function handlePerPage(e: React.ChangeEvent<HTMLInputElement>) {
        if (+e.target.value > 0 && +e.target.value <= 50) {
            setPerPage(+e.target.value);
        }
    }

    function handleSort() {
        if (sort === 'popularity') {
            setSort('title');
            setPerPage(0);
        } else {
            setSort('popularity');
            setPerPage(50);
        }
    }

    function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
    }

    async function getText() {
        try {
          let textArray = await axios.get(`http://localhost:5000/?text=${text}&sort=${sort}&perPage=${perPage}`);
          return textArray;
        } catch (err) {
          console.log(err);
        }
    }

    async function handleSetData() {
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 5000);
        props.setData(await getText());
    }

    



  return (
    <div className='search-wrapper'>
        <input type="text" name="" id="" className='search-input' placeholder='Введите имя исполнителя' value={text} onChange={e => {handleChangeText(e)}}/>
        <br />
        <br />
        <select name="" id="" className='search-value-songs' onChange={handleSort}>
            <option value="">По популярности</option>
            <option value="">Все песни</option>
        </select>
        <br />
        <br />
        <input type="number" name="" id="" className='search-songs-pages' value={perPage} onChange={e => {handlePerPage(e)}} disabled={sort === 'popularity' ? false : true}/>
        <br />
        <br />
        <button className='seacrh-play-button' onClick={handleSetData} disabled={disabled} style={{display: disabled === false ? 'inline' : 'none'}}>Начать игру</button>
        <p className='search-loading' style={{display: disabled === false ? 'none' : 'block'}}>Подождите, все песни исполнителя могут грузиться долго. <br /> Не нажимайте на кнопку больше 1 раза.</p>
    </div>
  )
}
