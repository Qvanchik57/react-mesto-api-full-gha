import React from 'react';


function InfoTooltip({isOpen, onClose, ...props}) {
    

    return (
        <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container">
                <img src={props.infoImg} className="popup__img"></img>
                <h2 className="popup__header-sign">{props.infoHeader}</h2>
                <button className="popup__profile-close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;