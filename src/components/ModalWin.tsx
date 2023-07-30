import React from 'react'

export default function ModalWin(props: {image: string, author: string, title: string, url: string, isConcide: boolean}) {
    const {image, author, title, url, isConcide} = props;
  return (
    <div className="playground-win-modal">
        <div className="playground-win-modal-content">
            <h1 className='playground-win-modal-content-congrats'>{isConcide === false ? 'Абсолютно верно !!!' : 'УВЫ ((('}</h1>
            <img src={image} alt="" className='playground-win-modal-content-image' />
            <div className="playground-win-modal-content-author">
            {author}
            </div>
            <div className="playground-win-modal-content-song">
            {title}
            </div>
            <div className="playground-win-modal-content-url">
            <a href={url} target='_blank'>Текст песни</a>
            </div>
            <button className='playground-win-modal-content-again' onClick={e => window.location.reload()}>Сыграть снова</button>
        </div>
    </div>
  )
}
