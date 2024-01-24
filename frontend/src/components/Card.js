import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some((i) => i === currentUser._id);

    const cardLikeButtonClassName = ( 
        `photos__button-like ${isLiked && 'photos__button-like_active'}` 
    );
   
    function handleClick() {
        onCardClick(card);
    }  

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteCard() {
        onCardDelete(card);
    }
    

    return (
        <li className="photos__element">
            <img className="photos__image" src={card.link} style={{ backgroundImage: `url(${card.link})` }} alt={card.name} onClick={handleClick}/>
            {isOwn && <button className="photos__button-delete" onClick={handleDeleteCard}></button>}
            <div className="photos__box">
                <h2 className="photos__name">{card.name}</h2>
                <div className="photos__likes">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="photos__like-count">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;