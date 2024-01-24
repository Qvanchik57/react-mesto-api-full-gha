import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onSubmit, ...props}) {

    const [avatarLink, setAvatarLink] = React.useState('');
    function handleSubmit(e) {
        e.preventDefault();
        
        onSubmit({
            avatar: avatarLink,
        });
        onClose();
    } 

    function handleChangeLink(e) {
        setAvatarLink(e.target.value);
    }

    React.useEffect(() => {
        setAvatarLink('');
    }, [isOpen])

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" buttonTitle="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
          <input id="avatar" className="popup__input-text" type="url" name="avatar" placeholder="Ссылка на аватар" required value={avatarLink || ''} onChange={handleChangeLink}/>
          <span className="popup__input-text-error avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;