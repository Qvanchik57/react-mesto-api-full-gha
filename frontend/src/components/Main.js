import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import { api } from '../utils/Api';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, handleHeaderLink, handleHeaderSign, loggenIn, ...props}) {
    const headerLink = 'Выйти';
    React.useEffect(() => {
        handleHeaderLink(headerLink);
      }, []
    )

    const headerSign = 'signin';
    React.useEffect(() => {
        handleHeaderSign(headerSign);
      }, []
    )

    const user = React.useContext(CurrentUserContext);
    
    return (
        <main className={props.class}>
        <section className="profile">
          <div className="profile__description">
            <button className="profile__avatar-edit" onClick={onEditAvatar}>
              <img className="profile__avatar" alt="Фото профиля" src={user.avatar} />
            </button>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__title">{user.name}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
              </div>
              <p className="profile__subtitle">{user.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}/>
        </section>
        <section className="photos">
          <ul className="photos__grid">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
           ))}
          </ul>
        </section>
      </main>
    );
}
  
export default Main;
