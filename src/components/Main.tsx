import React, { useState } from 'react';
import Search from './Search';
import PlayGround from './PlayGround';
import ModalInfo from './ModalInfo';

export default function Main() {
  const [data, setData] = useState();
  const [isStarted, setIsStarted] = useState(false);
  

  return (
    <div className='container'>
        <ModalInfo/>
        {isStarted === false ? 
          <Search setData={setData} /> :
          ('')
        }
        <PlayGround data={data} setIsStarted={setIsStarted} isStarted={isStarted} />
    </div>
  )
}
