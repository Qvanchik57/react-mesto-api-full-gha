import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, ...props}) {

    const currentUser = React.useContext(CurrentUserContext);
 
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
        onClose();
    } 

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen])

    return (
        <PopupWithForm title="Редактировать профиль" name="profile" buttonTitle="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
          <input id="name" className="popup__input-text" type="text" name="name" placeholder="Имя профиля" required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName}/>
          <span className="popup__input-text-error name-error"></span>
          <input id="descrip" className="popup__input-text" type="text" name="about" placeholder="Описание профиля" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription}/>
          <span className="popup__input-text-error descrip-error"></span>
        </PopupWithForm>
    );
}
  
export default EditProfilePopup;