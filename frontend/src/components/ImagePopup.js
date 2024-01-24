function ImagePopup(props) {
    return (
        <div className={`popup ${props.card.name ? 'popup_open' : ''}`}>
            <div className="discovery__container">
            <img className="discovery__img" src={props.card.link} alt={props.card.name}/>
            <p className="discovery__description">{props.card.name}</p>
            <button className="discovery__close popup__profile-close" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}
  
export default ImagePopup;