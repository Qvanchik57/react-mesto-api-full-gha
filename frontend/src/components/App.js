import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import * as auth from '../auth';
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import ok from '../images/ok.svg';
import NotOk from '../images/NotOk.svg';

function App(props) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [headerLink, setHeaderLink] = React.useState('Регистрация');
  const [headerSign, setHeaderSign] = React.useState('');
  const [headerEmail, setHeaderEmail] = React.useState('');
  const [infoHeader, setInfoHeader] = React.useState('');
  const [infoImg, setInfoImg] = React.useState('');

  function handleHeaderSign(sign) {
    setHeaderSign(sign);
  }

  function handleHeaderLink(link) {
    setHeaderLink(link);
  }

  const handleLoginOut = () => {
    setLoggedIn(false);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getStartDataUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        })

      api.getCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    handleTokenCheck()
  }, [])

  function handleTokenCheck () {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch(err => console.log(err))
    }
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAuthCheck(img, text) {
    let infoImgPopup = ok;
    if (img !== 'ok') {
      infoImgPopup = NotOk;
    }

    let header = 'Вы успешно зарегистрировались!';
    if (text !== 'ok') {
      header = `Что-то пошло не так!
      Попробуйте ещё раз.`
    }

    setInfoHeader(header);
    setInfoImg(infoImgPopup);
    setIsAuthPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsAuthPopupOpen(false);
  }

  function handleCardClick(cardForPopup) {
    setSelectedCard(cardForPopup);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (isLiked) { 
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    }
    
    else {
      api.putLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  function handleDeleteClick(card) {
    api.deleteCard(card._id)
      .then((cardDel) => {
        setCards((prevState) => prevState.filter(elem => {
            if (elem._id !== card._id) {
              return elem;
            }
          })
        )
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  function handleUpdateUser(dataProfile) {
    api.editUser(dataProfile)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(dataAvatar) {
    api.patchAvatar(dataAvatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  function handleAddPlaceSubmit(newCardData) {
    api.createNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
    }

  return (
    <div className={props.class}>
      <CurrentUserContext.Provider value={currentUser} >
        <BrowserRouter>
          <Header class="header" loggedIn={loggedIn} headerLink={headerLink} headerSign={headerSign} handleLoginOut={handleLoginOut} headerEmail={headerEmail} />
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/signin" replace />} />
            <Route path='/main' element={<ProtectedRouteElement element={Main} class="content" onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteClick} handleHeaderLink={handleHeaderLink} handleHeaderSign={handleHeaderSign} loggedIn={loggedIn} />}/>
            <Route path='/signup' element={<Register class={"sign"} onClose={closeAllPopups} handleHeaderLink={handleHeaderLink} handleHeaderSign={handleHeaderSign} isOpen={handleAuthCheck} />}/>
            <Route path='/signin' element={<Login handleLogin={handleLogin} class={"sign"} onClose={closeAllPopups} handleHeaderLink={handleHeaderLink} handleHeaderSign={handleHeaderSign} isOpen={handleAuthCheck} />}/>
          </Routes>
        </BrowserRouter>

        <Footer class="footer" />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>
        <PopupWithForm title="Вы уверены?" name="delete" buttonTitle="Да"></PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar}/>
        <ImagePopup class="discovery popup" isOpen={selectedCard} card={selectedCard} onClose={closeAllPopups}  />
        <InfoTooltip isOpen={isAuthPopupOpen} onClose={closeAllPopups} infoHeader={infoHeader} infoImg={infoImg} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
