import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({isOpen, onClose, onAddPlace, ...props}) {

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    function handleChangeCardName(e) {
        setCardName(e.target.value);
    }

    function handleChangeCardLink(e) {
        setCardLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          link: cardLink,
          name: cardName,
        });
        onClose();
    } 

    React.useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [isOpen])

    return (
        <PopupWithForm title="Новое место" name="photo" buttonTitle="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="mesto" className="popup__input-text" type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" value={cardName} onChange={handleChangeCardName}/>
            <span className="popup__input-text-error mesto-error"></span>
            <input id="link" className="popup__input-text" type="url" name="link" placeholder="Ссылка на картинку" required value={cardLink} onChange={handleChangeCardLink}/>
            <span className="popup__input-text-error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;