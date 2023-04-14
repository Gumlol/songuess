import React, { useState } from 'react'

export default function ModalInfo() {
    const [showModal, setShowModal] = useState(false);

    function handleChangeShowModal() {
        setShowModal(showModal === true ? false : true);
    }

    function handleChangeCloseModal() {
        setShowModal(false);
    }

  return (
    <div>
        <div className="info-button-wrapper">
            <button className='info-button' onClick={handleChangeShowModal}>i</button>
        </div>
        {showModal ? (
            <div className="info-modal">
                <div className="info-modal-content">
                    <button className='info-modal-content-close' onClick={handleChangeCloseModal}>X</button>
                    <h1 className='info-modal-content-title'>Правила игры</h1>
                    <div className="info-modal-content-main-info">
                        <p>Вы вводите название любого исполнителя.</p>
                        <p>Вам выдается случайная песня этого исполнителя<br />(по заданным параметрам), но со скрытым текстом.</p>
                        <p>Вы вводите слова, которые, как вам кажется, могут быть в песне.</p>
                        <p>Когда вам хватит слов, чтобы угадать название песни - вы победили.</p>
                    </div>
                    <br /><br /><br /><br /><br />
                    <div className="info-modal-content-post-info">
                        <p>P.S. Некоторые слова могут слипаться, а также быть изначально показаны.</p>
                        <p>P.S. Все тексты песен взяты с сайта <a href="https://genius.com/" target='_blank' className='info-modal-content-post-info-url'>genius.com</a></p>
                        <p>P.S. "E" и "Ё" это разные буквы.</p>
                        <p>P.S. Также могут возникать другие проблемы.</p>
                    </div>
                </div>
            </div>
        ) : (
            ''
        )
    }
        
    </div>
  )
}
